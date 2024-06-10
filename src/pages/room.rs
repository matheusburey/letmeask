use crate::components::{button::Button, header::Header};

use leptos::*;
use leptos_router::use_params_map;
use leptos_use::{use_websocket, UseWebsocketReturn};

#[component]
pub fn Room() -> impl IntoView {
    let params = move || use_params_map();
    let code = move || params().with(|pr| pr.get("code").cloned().unwrap_or_default());
    let (room_data, set_room_data) = create_signal(vec![]);
    let room_name = "React".to_string();
    let (new_question, set_new_question) = create_signal("".to_string());

    fn update_question(&room_data: &WriteSignal<Vec<String>>, message: String) {
        let _ = &room_data.update(|room_data: &mut Vec<_>| room_data.push(message));
    }

    let UseWebsocketReturn { message, send, .. } =
        use_websocket(format!("ws://localhost:3000/ws/{}", &code()).as_str());

    let send_message = move |_| {
        let m = new_question.get();
        send(&m);
    };

    let has_questions = move || room_data.get().len() != 0;

    create_effect(move |_| {
        if let Some(m) = message.get() {
            update_question(&set_room_data, format! {"[message]: {:?}", m});
        };
    });

    view! {
        <Header code=code() admin=false />
        <main class="max-w-4xl w-full flex flex-col px-8 mx-auto">
            <div class="flex justify-between items-center my-8">
                <h1 class="text-2xl font-bold font-poppins">
                    "Sala " {room_name}
                </h1>
                {move || has_questions().then(|| view!{
                    {room_data.get().len()} " perguntas"
                })}
            </div>
            <textarea
                placeholder="Qual sua pergunta?"
                class="w-full resize-none rounded p-4 text-lg leading-relaxed shadow-md"
                on:input=move |ev| { set_new_question(event_target_value(&ev)) }
            />
            <div class="flex justify-between items-center my-8">
                {move || true.then(|| view!{
                    <p>
                        "Para enviar uma pergunta"
                        <button>faça seu login</button>
                    </p>
                })}
                <div class="w-44">
                    <Button
                        disabled=false
                        on:click=send_message text="Enviar pergunta".to_string()
                    />
                </div>
            </div>
            <div>
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
