"""Isolated browser-test API. Never imported by the production application."""
import os
from contextlib import asynccontextmanager

os.environ["JWT_SECRET_KEY"] = "e2e-only-secret-which-is-at-least-32-characters"
os.environ["POSTGRES_PASSWORD"] = "unused-e2e-password"

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.auth import router
from app.database import Base, get_session
from app.models import User
from app.security import hash_password

test_engine = create_async_engine("sqlite+aiosqlite://", poolclass=StaticPool)
sessions = async_sessionmaker(test_engine, expire_on_commit=False)


async def test_session():
    async with sessions() as session:
        yield session


@asynccontextmanager
async def lifespan(app):
    async with test_engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    async with sessions() as session:
        session.add(User(username="manager", email="manager@example.com", phone="+996700123456",
                         hashed_password=hash_password("E2eTestPassword!")))
        await session.commit()
    yield
    await test_engine.dispose()


app = FastAPI(lifespan=lifespan)
app.include_router(router)
app.dependency_overrides[get_session] = test_session


@app.get("/health")
async def health():
    return {"status": "ok"}
