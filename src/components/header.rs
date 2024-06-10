use leptos::*;

#[component]
pub fn Header(code: String, admin: bool) -> impl IntoView {
    view! {
        <header class="border-b border-gray-300 p-6">
            <div class="flex items-center justify-between max-w-5xl mx-auto px-4 pt-6">
                <a href="/">
                    <img width="160" src="/logo.svg" alt="Cruel doubt" />
                </a>
                <div class="flex items-center gap-4">
                <button
                    class="flex items-center gap-2 border border-blue-500 hover:bg-blue-100 py-2 px-4 rounded"
                >
                    "Sala #"{code}
                </button>
                {move || admin.then(|| view!{
                    <button class="border border-red-500 hover:bg-red-100 text-red-500 py-2 px-4 rounded">
                        "Encerar sala"
                    </button>
                })}
                </div>
            </div>
        </header>
    }
}
