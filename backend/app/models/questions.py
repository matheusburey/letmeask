from uuid import uuid4


class Questions:
    def __init__(self, description: str, room_id: str):
        self.id = str(uuid4())
        self.description = description
        self.room_id = room_id
        self.is_highlighted = False
        self.is_answered = False
        self.like_count = 0
