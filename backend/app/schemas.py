import re
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


def normalize_phone(value: str) -> str:
    return re.sub(r"[\s()\-]", "", value)


class LoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=254)
    password: str = Field(min_length=1, max_length=72)
    remember_me: bool = False

    @field_validator("username")
    @classmethod
    def clean_identifier(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Введите логин, телефон или email")
        return value.strip()

    @field_validator("password")
    @classmethod
    def password_byte_length(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Пароль не должен превышать 72 байта UTF-8")
        return value


class UserCreate(BaseModel):
    username: str = Field(pattern=r"^[a-zA-Z][a-zA-Z0-9_.-]{2,63}$")
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    phone: str | None = None

    _password_byte_length = field_validator("password")(LoginRequest.password_byte_length.__func__)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = normalize_phone(value)
        if not re.fullmatch(r"\+[1-9]\d{7,14}", value):
            raise ValueError("Телефон должен быть в международном формате: +996700123456")
        return value


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    email: str
    phone: str | None
    created_at: datetime
