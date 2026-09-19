import asyncio
import os
from datetime import datetime, timedelta, timezone

os.environ["JWT_SECRET_KEY"] = "test-only-secret-which-is-at-least-32-characters"
os.environ["POSTGRES_PASSWORD"] = "test-password"

import jwt
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.auth import router
from app.config import get_settings
from app.database import Base, get_session
from app.models import User
from app.schemas import UserCreate
from app.security import hash_password

import pytest


@pytest.fixture
def client():
    engine = create_async_engine("sqlite+aiosqlite://", poolclass=StaticPool)
    sessions = async_sessionmaker(engine, expire_on_commit=False)

    async def prepare():
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)
        async with sessions() as session:
            session.add(User(username="manager", email="manager@example.com",
                             phone="+996700123456", hashed_password=hash_password("ValidPass123!")))
            await session.commit()

    asyncio.run(prepare())

    async def override_session():
        async with sessions() as session:
            yield session

    app = FastAPI()
    app.include_router(router)
    app.dependency_overrides[get_session] = override_session
    with TestClient(app) as test_client:
        yield test_client
    asyncio.run(engine.dispose())


@pytest.mark.parametrize("identifier", ["manager", " MANAGER ", "MANAGER@example.com", "+996 (700) 123-456"])
def test_login_identifiers_and_protected_profile(client, identifier):
    response = client.post("/api/v1/auth/login", json={"username": identifier, "password": "ValidPass123!"})
    assert response.status_code == 200
    assert response.headers["cache-control"] == "no-store"
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 3600
    profile = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {data['access_token']}"})
    assert profile.status_code == 200
    assert profile.json()["username"] == "manager"
    assert "hashed_password" not in profile.json()


@pytest.mark.parametrize("username,password", [("manager", "wrong"), ("missing", "ValidPass123!")])
def test_invalid_credentials(client, username, password):
    response = client.post("/api/v1/auth/login", json={"username": username, "password": password})
    assert response.status_code == 401
    assert response.json()["detail"] == "Неверный логин или пароль"


@pytest.mark.parametrize("payload", [
    {}, {"username": "  ", "password": "x"}, {"username": "manager", "password": ""},
    {"username": "manager", "password": "я" * 37},
])
def test_validation(client, payload):
    assert client.post("/api/v1/auth/login", json=payload).status_code == 422


def test_remember_me_lifetime(client):
    response = client.post("/api/v1/auth/login", json={
        "username": "manager", "password": "ValidPass123!", "remember_me": True,
    })
    data = response.json()
    claims = jwt.decode(data["access_token"], get_settings().jwt_secret_key, algorithms=["HS256"])
    assert data["expires_in"] == 7 * 24 * 3600
    assert claims["exp"] - claims["iat"] == data["expires_in"]


def test_reject_missing_expired_and_tampered_tokens(client):
    assert client.get("/api/v1/auth/me").status_code == 401
    expired = jwt.encode({"sub": "1", "iat": datetime.now(timezone.utc) - timedelta(hours=2),
                          "exp": datetime.now(timezone.utc) - timedelta(hours=1)},
                         get_settings().jwt_secret_key, algorithm="HS256")
    for token in [expired, "invalid.token.signature"]:
        assert client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"}).status_code == 401


def test_user_creation_validation():
    user = UserCreate(username="manager", email="manager@example.com", password="ValidPass123!",
                      phone="+996 (700) 123-456")
    assert user.phone == "+996700123456"
    with pytest.raises(ValueError):
        UserCreate(username="manager@example.com", email="manager@example.com", password="ValidPass123!")


def test_application_health_and_cors(monkeypatch):
    import main

    test_engine = create_async_engine("sqlite+aiosqlite://", poolclass=StaticPool)
    monkeypatch.setattr(main, "engine", test_engine)
    with TestClient(main.app) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "database": "ok"}
        preflight = client.options("/api/v1/auth/login", headers={
            "Origin": "http://localhost:3000", "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type",
        })
        assert preflight.status_code == 200
        assert preflight.headers["access-control-allow-origin"] == "http://localhost:3000"
        rejected = client.options("/api/v1/auth/login", headers={
            "Origin": "https://untrusted.example", "Access-Control-Request-Method": "POST",
        })
        assert rejected.status_code == 400
