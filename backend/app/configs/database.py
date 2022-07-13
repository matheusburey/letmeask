from pymongo.mongo_client import MongoClient
from .config import settings

client = MongoClient(settings.database_url)

database = client.cruel_doubt
