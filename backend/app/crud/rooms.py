from app.configs.database import database
from app.models.rooms import Rooms


class RoomsCrud:
    db = database.rooms

    @classmethod
    def new_room(cls, data: dict):
        room = Rooms(**data)
        cls.db.insert_one(room.__dict__)
        return cls.serialize(room)

    @classmethod
    def get_room_id(cls, id: str):
        room = list(cls.db.find({"id": id}))
        if room == []:
            return None
        return cls.serialize(room)

    def delete_room(self, id: str):
        room = self.db.find_one_and_delete({"id": id})
        return True if room else None

    @staticmethod
    def serialize(rooms):
        if type(rooms) is list:
            for room in rooms:
                room.update({"_id": str(room["_id"])})
        elif type(rooms) is dict:
            rooms.update({"_id": str(rooms["_id"])})
        else:
            rooms._id = str(rooms._id)
        return rooms
