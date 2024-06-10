use leptos::*;

#[server]
pub async fn check_room_exists(room_code: String) -> Result<(), ServerFnError> {
    logging::log!("{}", room_code);
    leptos_axum::redirect("/room/435234523452345");
    Ok(())
}

#[server]
pub async fn create_room(room_name: String) -> Result<(), ServerFnError> {
    logging::log!("{}", room_name);
    leptos_axum::redirect("/room/435234523452345/admin");
    Ok(())
}

