use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, State,
    },
    response::IntoResponse,
    routing::get,
    Router,
};
use futures_util::{
    sink::SinkExt,
    stream::{SplitSink, StreamExt},
};
use leptos::logging;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

pub async fn handler(
    ws: WebSocketUpgrade,
    State(ws_manager): State<Arc<Mutex<WsManager>>>,
    Path(room): Path<String>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, ws_manager, room))
}

async fn handle_socket(socket: WebSocket, ws_manager: Arc<Mutex<WsManager>>, room: String) {
    let (sender, mut receiver) = socket.split();
    ws_manager.lock().await.join_room(room.clone(), sender);

    loop {
        match receiver.next().await {
            Some(Ok(message)) => {
                ws_manager
                    .lock()
                    .await
                    .send_message(room.clone(), message)
                    .await;
            }
            Some(Err(e)) => {
                logging::log!("Erro ao receber mensagem: {}", e);
                break;
            }
            None => {
                logging::log!("Cliente desconectado");
                break;
            }
        }
    }
    ws_manager.lock().await.leave_room(room);
}

pub struct WsManager {
    rooms: HashMap<String, Vec<SplitSink<WebSocket, Message>>>,
}

impl WsManager {
    pub async fn new() -> Self {
        Self {
            rooms: HashMap::new(),
        }
    }

    fn join_room(&mut self, room_id: String, sender: SplitSink<WebSocket, Message>) {
        self.rooms
            .entry(room_id)
            .or_insert_with(Vec::new)
            .push(sender);
        // self.rooms.insert(room_id, sender);
    }

    fn leave_room(&mut self, room_id: String) {
        self.rooms.remove(&room_id);
    }

    async fn send_message(&mut self, room_id: String, message: Message) {
        if let Some(senders) = self.rooms.get_mut(&room_id) {
            for sender in senders {
                if let Err(e) = sender.send(message.clone()).await {
                    logging::log!("Erro ao enviar mensagem: {}", e);
                }
            }
        }
    }
}

#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use cruel_doubt::app::App;
    use cruel_doubt::fileserv::file_and_error_handler;
    use leptos::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    let conf = get_configuration(None).await.unwrap();
    let leptos_options = conf.leptos_options;
    let addr = leptos_options.site_addr;
    let routes = generate_route_list(App);

    let ws_manager = Arc::new(Mutex::new(WsManager::new().await));

    let app = Router::new()
        .route("/ws/:room", get(handler))
        .with_state(ws_manager)
        .leptos_routes(&leptos_options, routes, App)
        .fallback(file_and_error_handler)
        .with_state(leptos_options);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    logging::log!("listening on http://{}", &addr);
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
