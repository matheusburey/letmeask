from pydantic import BaseSettings


class BaseConfig(BaseSettings):
    database_url: str

    class Config:
        env_file = ".env.local"


settings = BaseConfig()
