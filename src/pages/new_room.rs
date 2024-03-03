use crate::api::room::create_room;
use crate::components::{aside::Aside, button::Button, input::Input};

use leptos::*;

fn click_button_create_new_room(name: String) {
    spawn_local(async {
        let res = create_room(name).await;
        match res {
            Ok(_) => {
                logging::log!("ok")
            }
            Err(_) => {
                logging::log!("error")
            }
        }
    });
}

#[component]
pub fn NewRoom() -> impl IntoView {
    let (room_name, set_room_name) = create_signal("".to_string());

    view! {
        <div class="flex min-h-screen">
            <Aside />
            <main class="basis-1/2 flex justify-center items-center">
                <div class="max-w-80 w-full flex flex-col">
                    <a href="/" class="mx-auto mb-20">
                        <img width="170" src="/logo.svg" alt="Cruel doubt" />
                    </a>
                    <h2 class="text-center font-poppins font-bold text-2xl mb-4">
                        Criar uma nova sala
                    </h2>
                    <Input
                        set_value={set_room_name}
                        placeholder="Nome da sala".to_string()
                    />
                    <Button disabled=false text="Criar sala".to_string() on:click=move |_| click_button_create_new_room(room_name.get()) />

                    <p class="text-gray-400 text-sm mt-4">
                        Quer entrar em uma sala existente?
                        <a href="/" class="text-purple-600">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    }
}
