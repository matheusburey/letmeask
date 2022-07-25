from typing import List
from fastapi import WebSocket
from app.configs.database import database
from app.models.questions import Questions


class QuestionsCrud:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.db = database.questions

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message):
        for connection in self.active_connections:
            await connection.send_json(message)

    def new_questions(self, description: str, room_id: str):
        question = Questions(description, room_id)
        self.db.insert_one(question.__dict__)
        return self.serialize(question.__dict__)

    def get_questions(self, room_id: str):
        questions = list(self.db.find({"room_id": room_id}))
        if questions == []:
            return []
        return self.serialize(questions)

    def delete_questions(self, id: str):
        question = self.db.find_one_and_delete({"id": id})
        return True if question else None

    @staticmethod
    def serialize(questions):
        if type(questions) is list:
            for question in questions:
                question.update({"_id": str(question["_id"])})
        else:
            questions.update({"_id": str(questions["_id"])})
        return questions
