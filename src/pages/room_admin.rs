use crate::components::header::Header;
use leptos::*;

use leptos_use::{use_websocket, UseWebsocketReturn};

#[component]
pub fn RoomAdmin() -> impl IntoView {
    let (room_data, set_room_data) = create_signal(vec![]);
    let room_name = "React".to_string();

    fn update_question(&room_data: &WriteSignal<Vec<String>>, message: String) {
        let _ = &room_data.update(|room_data: &mut Vec<_>| room_data.push(message));
    }

    let UseWebsocketReturn {
        message,
        message_bytes,
        ..
    } = use_websocket("ws://localhost:3000/ws");

    // let send_message = move |_| {
    //     let m = new_question.get();
    //     send(&m);
    // };

    let has_questions = move || room_data.get().len() != 0;

    create_effect(move |_| {
        if let Some(m) = message.get() {
            update_question(&set_room_data, format! {"[message]: {:?}", m});
        };
    });

    create_effect(move |_| {
        if let Some(m) = message_bytes.get() {
            update_question(&set_room_data, format! {"[message_bytes]: {:?}", m});
        };
    });

    view! {
        <Header code="22123124124".to_string() admin=true />
        <main class="max-w-4xl w-full flex flex-col px-8 mx-auto">
            <div class="flex justify-between items-center my-8">
                <h1 class="text-2xl font-bold font-poppins">
                    "Sala " {room_name}
                </h1>
                {move || has_questions().then(|| view!{
                    {room_data.get().len()} " perguntas"
                })}
            </div>
            <div class="flex flex-col">
                <For
                    each=move || room_data.get().into_iter().enumerate()
                    key=|(index, _)| *index
                    let:item
                >
                    <div>{item.1}</div>
                </For>
            </div>
        </main>
    }
}
