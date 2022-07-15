from fastapi import HTTPException
from app.schemas.questions import QuestionsSchemas
from app.crud.questions import QuestionsCrud


async def create_new_question(data: QuestionsSchemas):
    try:
        question = QuestionsCrud().new_questions(data.__dict__)
        return {"status": "ok", "data": question}
    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}


async def get_all_questions(room_id: str):
    try:
        questions = QuestionsCrud().get_questions(room_id)
        return {"status": "ok", "data": questions}
    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}


async def delete_questions(room_id: str):
    try:
        questions = QuestionsCrud().delete_questions(room_id)
        if questions:
            return {"status": "ok", "data": questions}
    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}
    description = "room not found"
    raise HTTPException(
        status_code=404,
        detail={"detail": {"status": "error", "description": description}},
    )
