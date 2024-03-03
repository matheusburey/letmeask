use leptos::*;

#[component]
pub fn Input(placeholder: String, set_value: WriteSignal<String>) -> impl IntoView {
    view! {
        <input
            class="border border-gray-300 py-3 px-4 rounded mb-2"
            type="text"
            placeholder=placeholder
            on:input=move |ev| { set_value(event_target_value(&ev)) }
        />
    }
}
