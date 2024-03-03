use crate::pages;
use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();
    view! {
        <Stylesheet id="leptos" href="/pkg/cruel-doubt.css"/>
        <Title text="Cruel Doubt"/>

        <Router>
            <main>
                <Routes>
                    <Route path="/" view=pages::home::Home/>
                    <Route path="/room/new" view=pages::new_room::NewRoom/>
                    <Route path="/room/:code" view=pages::room::Room/>
                    <Route path="/room/:code/admin" view=pages::room_admin::RoomAdmin/>
                    <Route path="not-found" view=pages::not_found::NotFound/>
                </Routes>
            </main>
        </Router>
    }
}
