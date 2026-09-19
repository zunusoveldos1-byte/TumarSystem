from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.auth import router
from app.config import get_settings
from app.database import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Bootstrap only: use Alembic migrations before evolving a deployed schema.
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(title="TumarSystem API", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware, allow_origins=get_settings().cors_origins,
    allow_credentials=True, allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(router)


@app.get("/api/v1/health", tags=["health"])
async def health():
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    except SQLAlchemyError:
        raise HTTPException(status_code=503, detail="Database unavailable")
    return {"status": "ok", "database": "ok"}
