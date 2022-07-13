from fastapi import APIRouter

rout_questions = APIRouter(prefix="/question")


@rout_questions.get("")
async def create_new_question(data: dict):
    return {"detail": {"status": "ok", "data": data}}
