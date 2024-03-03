use leptos::*;

#[component]
pub fn Aside() -> impl IntoView {
    view! {
        <aside class="bg-purple-600 flex flex-col justify-center text-white px-20 gap-4 basis-1/2">
            <img
                width="320"
                src="/illustration.svg"
                alt="Ilustração simbolizando perguntas e respostas"
            />
            <p class="font-bold text-4xl font-poppins">
                "Crie salas de Q&A ao-vivo"
            </p>
            <p class="text-2xl">"Tire as dúvidas da sua audiência em tempo-real"</p>
        </aside>
    }
}
