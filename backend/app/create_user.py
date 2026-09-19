"""Create the first user without a public registration endpoint."""
import argparse
import asyncio
from getpass import getpass

from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError

from app.database import SessionLocal, engine
from app.models import User
from app.schemas import UserCreate
from app.security import hash_password


async def create_user(data: UserCreate):
    try:
        async with SessionLocal() as session:
            session.add(User(username=data.username.lower(), email=str(data.email).lower(),
                             phone=data.phone, hashed_password=hash_password(data.password)))
            await session.commit()
    finally:
        await engine.dispose()


def main():
    parser = argparse.ArgumentParser(description="Создать пользователя TumarSystem")
    parser.add_argument("--username", required=True)
    parser.add_argument("--email", required=True)
    parser.add_argument("--phone")
    args = parser.parse_args()
    password = getpass("Пароль (минимум 8 символов): ")
    if password != getpass("Повторите пароль: "):
        parser.exit(1, "Пароли не совпадают.\n")
    try:
        data = UserCreate(**vars(args), password=password)
        asyncio.run(create_user(data))
    except ValidationError as error:
        for item in error.errors(include_input=False, include_url=False):
            print(f"{item['loc'][0]}: {item['msg']}")
        parser.exit(1)
    except IntegrityError:
        parser.exit(1, "Логин, email или телефон уже используется.\n")
    print("Пользователь создан.")


if __name__ == "__main__":
    main()
