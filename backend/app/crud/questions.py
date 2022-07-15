from app.configs.database import database
from app.models.questions import Questions


class QuestionsCrud:
    db = database.questions

    @classmethod
    def new_questions(cls, data: dict):
        question = Questions(**data)
        cls.db.insert_one(question.__dict__)
        return cls.serialize(question.__dict__)

    @classmethod
    def get_questions(cls, room_id: str):
        questions = list(cls.db.find({"room_id": room_id}))
        if questions == []:
            return []
        return cls.serialize(questions)

    def delete_questions(self, id: str):
        question = self.db.find_one_and_delete({"id": id})
        return True if question else None

    @staticmethod
    def serialize(questions):
        if type(questions) is list:
            for question in questions:
                question.update({"_id": str(question["_id"])})
        else:
            questions.update({"_id": str(questions["_id"])})
        return questions
