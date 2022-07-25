from fastapi import WebSocket, WebSocketDisconnect
from app.crud.questions import QuestionsCrud

manager = QuestionsCrud()


async def ws(websocket: WebSocket, room_id: str):
    await manager.connect(websocket)
    all_questions = manager.get_questions(room_id)
    await manager.send_personal_message(all_questions, websocket)
    try:
        while True:
            description = await websocket.receive_text()
            manager.new_questions(description, room_id)
            data = manager.get_questions(room_id)
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
