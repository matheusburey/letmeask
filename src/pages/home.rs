use crate::api::room::check_room_exists;
use crate::components::{aside::Aside, button::Button, input::Input};

use leptos::*;

fn click_button_join_room(code: String) {
    spawn_local(async {
        let res = check_room_exists(code).await;
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
pub fn Home() -> impl IntoView {
    let (room_code, set_room_code) = create_signal("".to_string());

    view! {
        <div class="flex min-h-screen">
            <Aside />
            <main class="basis-1/2 flex justify-center items-center">
                <div class="max-w-80 w-full flex flex-col">
                    <img class="mx-auto mb-20" width="170" src="/logo.svg" alt="Cruel doubt" />
                    <a
                        href="/room/new"
                        class="text-center border border-black hover:bg-gray-50 py-2 rounded"
                    >
                        "Crie sua sala"
                    </a>
                    <div class="flex justify-center items-center my-8">
                        <hr class="basis-1/5" />
                        <p class="text-gray-300 basis-3/5 text-center">"ou entre em uma sala"</p>
                        <hr class="basis-1/5" />
                    </div>
                    <Input
                        placeholder="Digite o código da sala".to_string()
                        set_value={set_room_code}
                    />
                    <Button disabled=false on:click=move |_| click_button_join_room(room_code.get()) text="Entrar".to_string() />
                </div>
            </main>
        </div>
    }
}
