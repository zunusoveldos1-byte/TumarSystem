from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import URL


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=("../.env", ".env"), extra="ignore")

    postgres_db: str = "tumar"
    postgres_user: str = "tumar"
    postgres_password: str
    db_host: str = "localhost"
    db_port: int = 5432
    jwt_secret_key: str = Field(min_length=32)
    access_token_expire_minutes: int = Field(default=60, gt=0)
    remember_token_expire_minutes: int = Field(default=10080, gt=0)
    cors_origins: list[str] = ["http://localhost:3000"]

    @property
    def database_url(self) -> URL:
        return URL.create(
            "postgresql+asyncpg", username=self.postgres_user,
            password=self.postgres_password, host=self.db_host,
            port=self.db_port, database=self.postgres_db,
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
