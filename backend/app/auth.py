from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.concurrency import run_in_threadpool
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_session
from app.models import User
from app.schemas import LoginRequest, TokenResponse, UserResponse, normalize_phone
from app.security import DUMMY_HASH, create_access_token, verify_password

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])
Session = Annotated[AsyncSession, Depends(get_session)]
bearer = HTTPBearer(auto_error=False)


def unauthorized() -> HTTPException:
    return HTTPException(status.HTTP_401_UNAUTHORIZED,
                         "Неверный логин или пароль", headers={"WWW-Authenticate": "Bearer"})


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, session: Session, response: Response):
    identifier = payload.username
    # Separate namespaces avoid collisions between usernames, emails and phones.
    if "@" in identifier:
        condition = func.lower(User.email) == identifier.lower()
    elif identifier.startswith("+"):
        condition = User.phone == normalize_phone(identifier)
    else:
        condition = func.lower(User.username) == identifier.lower()
    user = await session.scalar(select(User).where(condition))
    valid = await run_in_threadpool(
        verify_password, payload.password, user.hashed_password if user else DUMMY_HASH
    )
    if not valid or user is None:
        raise unauthorized()
    token, expires_in = create_access_token(user.id, payload.remember_me)
    response.headers["Cache-Control"] = "no-store"
    return TokenResponse(access_token=token, expires_in=expires_in)


async def current_user(
    session: Session,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
) -> User:
    if credentials is None:
        raise unauthorized()
    try:
        payload = jwt.decode(credentials.credentials, get_settings().jwt_secret_key,
                             algorithms=["HS256"], options={"require": ["sub", "exp", "iat"]})
        user_id = int(payload["sub"])
    except (jwt.InvalidTokenError, ValueError, TypeError):
        raise unauthorized()
    user = await session.get(User, user_id)
    if user is None:
        raise unauthorized()
    return user


@router.get("/me", response_model=UserResponse)
async def me(user: Annotated[User, Depends(current_user)]):
    return user
