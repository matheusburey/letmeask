from pydantic import BaseModel


class QuestionsSchemas(BaseModel):
    room_id: str
    description: str
