from fastapi import APIRouter
from app.controlers import rooms

rout_rooms = APIRouter(prefix="/rooms", tags=["rooms"])


rout_rooms.post("")(rooms.create_new_room)
rout_rooms.get("/{room_id}")(rooms.check_room_exists)
rout_rooms.delete("/{room_id}")(rooms.delete_room_by_id)
