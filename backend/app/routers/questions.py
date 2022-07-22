from fastapi import APIRouter

from app.controlers import questions

rout_questions = APIRouter(prefix="/questions")


rout_questions.websocket("/{room_id}")(questions.ws)
