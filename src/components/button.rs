use leptos::*;

#[component]
pub fn Button(disabled: bool, text: String) -> impl IntoView {
    view! {
        <button
            class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 w-full rounded disabled:bg-violet-200"
            disabled=disabled
        >
            {text}
        </button>
    }
}
