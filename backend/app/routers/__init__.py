from fastapi import APIRouter
from app.routers.questions import rout_questions
from app.routers.rooms import rout_rooms

routers = APIRouter(prefix="/api/v1")

routers.include_router(rout_questions)
routers.include_router(rout_rooms)
