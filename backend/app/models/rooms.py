from string import ascii_uppercase, digits
from random import choice


class Rooms:
    def __init__(self, title: str):
        self.id = "".join(choice(ascii_uppercase + digits) for _ in range(15))
        self.title = title
