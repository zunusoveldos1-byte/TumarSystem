from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.config import get_settings

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
DUMMY_HASH = password_context.hash("timing-equalization-password")


def hash_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def create_access_token(user_id: int, remember_me: bool = False) -> tuple[str, int]:
    settings = get_settings()
    minutes = (settings.remember_token_expire_minutes if remember_me
               else settings.access_token_expire_minutes)
    now = datetime.now(timezone.utc)
    token = jwt.encode(
        {"sub": str(user_id), "iat": now, "exp": now + timedelta(minutes=minutes)},
        settings.jwt_secret_key, algorithm="HS256",
    )
    return token, minutes * 60
