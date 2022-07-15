from fastapi import APIRouter
from app.controlers import questions

rout_questions = APIRouter(prefix="/questions")


rout_questions.post("")(questions.create_new_question)
rout_questions.get("/{room_id}")(questions.get_all_questions)
rout_questions.delete("/{room_id}")(questions.delete_questions)
