from fastapi import HTTPException
from app.crud.rooms import RoomsCrud
from app.schemas.rooms import RoomsSchemas


async def create_new_room(data: RoomsSchemas):
    try:
        room = RoomsCrud().new_room(data.__dict__)
        return {"data": room}
    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}


async def check_room_exists(room_id: str):
    try:
        rooms = RoomsCrud.get_room_id(room_id)
        if rooms:
            return {"data": rooms}

    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}

    raise HTTPException(
        status_code=404,
        detail={"detail": {"status": "error", "description": "room not found"}},
    )


async def delete_room_by_id(room_id: str):
    try:
        deleted = RoomsCrud().delete_room(room_id)
        if deleted:
            return {"status": "ok", "description": "room deleted"}

    except Exception as e:
        print(e)
        return {"detail": {"status": "error", "description": "server error"}}

    raise HTTPException(
        status_code=404,
        detail={"detail": {"status": "error", "description": "room not found"}},
    )
