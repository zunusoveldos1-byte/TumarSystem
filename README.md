# TumarSystem

Фундамент приложения для управления бильярдным клубом: Next.js App Router + TypeScript + Tailwind CSS + Lucide React; FastAPI + Pydantic v2 + SQLAlchemy 2 async + asyncpg; PostgreSQL 16.

## Запуск через Docker

Требуется Docker Desktop с Compose v2. Локальный `.env` уже создан со случайными секретами и исключён из Git. Для нового клона скопируйте `.env.example` в `.env` и замените пароль БД и JWT-секрет (не менее 32 символов; можно сгенерировать `python -c "import secrets; print(secrets.token_urlsafe(48))"`).

```sh
docker compose up --build -d
docker compose exec backend python -m app.create_user --username admin --email admin@example.com --phone +996700123456
```

CLI попросит пароль и повторный ввод без отображения в терминале. Общей учётной записи или стандартного пароля нет. Телефон необязателен.

- Страница входа: http://localhost:3000/login
- Личный кабинет: http://localhost:3000/dashboard
- API / Swagger: http://localhost:8000/docs
- Проверка API и БД: http://localhost:8000/api/v1/health

Остановка: `docker compose down`. Данные сохраняются в томе `postgres_data`.

## Структура

```text
backend/
  main.py                # lifespan, CORS, health
  app/
    config.py            # переменные окружения
    database.py          # async engine и сессии
    models.py            # User
    schemas.py           # Pydantic DTO и нормализация
    security.py          # bcrypt и JWT
    auth.py              # login и защищённый /me
    create_user.py       # CLI создания пользователей
  tests/test_auth.py
frontend/
  src/app/login/         # страница по макету
  src/app/api/v1/auth/   # серверный посредник к FastAPI
  src/app/dashboard/     # проверка сессии и выход
  src/components/        # логотип и форма
  src/lib/auth.ts        # серверная работа с сессией
  public/images/         # локальная фотография Unsplash
  tests/                 # браузерные тесты
docker-compose.yml
.env.example
```

## Авторизация

`POST /api/v1/auth/login` принимает JSON:

```json
{"username":"admin","password":"your-password","remember_me":false}
```

Возвращает `access_token`, `token_type: "bearer"`, `expires_in` (секунды). `GET /api/v1/auth/me` принимает `Authorization: Bearer <token>`.

Логин и email регистронезависимы. CLI сохраняет их в нижнем регистре. Логин начинается с латинской буквы, имеет длину 3–64 символа, допускает цифры, `_`, `.`, `-`. Для телефона используется международный формат с `+`, например `+996700123456`; пробелы, скобки и дефисы при входе удаляются. `phone` — дополнительное nullable-поле модели для реального входа по телефону. Пароль ограничен 72 байтами UTF-8 из-за bcrypt. Passlib использует совместимую закреплённую версию bcrypt 4.0.1.

Браузер отправляет форму в Next.js `/api/v1/auth/login`, который вызывает FastAPI и записывает JWT в HttpOnly-cookie с SameSite=Lax. Токен не доступен клиентскому JavaScript. Без «Запомнить меня» cookie сессионная, JWT действует 60 минут; с флажком — 7 дней. Сроки настраиваются в `.env`. Выход удаляет cookie. Истечение JWT проверяется FastAPI; защищённая страница повторно проверяет пользователя через `/me`.

Ссылка «Забыли пароль?» открывает доступное с клавиатуры окно с обращением к администратору клуба. Автоматическое восстановление через email/SMS не входит в этот фундамент.

## Локальная разработка

Python 3.12+, Node.js 22+, работающий PostgreSQL 16. Чтобы использовать только БД из Compose локально, добавьте временный файл `compose.local.yml`:

```yaml
services:
  db:
    ports:
      - "127.0.0.1:5432:5432"
```

```sh
docker compose -f docker-compose.yml -f compose.local.yml up -d db
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate ; Linux/macOS: source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn main:app --reload
```

Во втором терминале из корня проекта:

```sh
cd frontend
npm ci
npm run dev
```

Backend читает корневой `.env`; для локальной БД по умолчанию используется localhost. Frontend обращается к `http://127.0.0.1:8000`; переопределение — `BACKEND_URL` в `frontend/.env.local`. Для создания пользователя локально: `python -m app.create_user --username admin --email admin@example.com` из `backend` после первого запуска API.

## Проверки

```sh
cd backend
python -m pytest -q
cd ../frontend
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Тесты API используют SQLite in-memory для проверки логики маршрутов и JWT без PostgreSQL. Они не заменяют интеграционную проверку PostgreSQL и Docker. Браузерные тесты запускают production-сборку Next.js на порту 3100 и изолированный FastAPI с SQLite на 8100 (нужна `backend/.venv` с dev-зависимостями). Они проверяют валидацию, видимость пароля, чекбокс, загрузку, ошибку входа, восстановление, мобильную ширину, защиту маршрутов и полный вход/выход через настоящий API с проверкой HttpOnly-cookie. Тестовый пользователь существует только в памяти тестового процесса и не попадает в рабочую БД.

## Границы фундамента

Таблицы создаются при первом старте через `metadata.create_all`; изменение существующей схемы требует Alembic-миграций. Перед публичным развёртыванием настройте HTTPS и `COOKIE_SECURE=true`, ограничение попыток входа на шлюзе и управление секретами. CORS задаётся JSON-массивом конкретных origins. Next.js и браузер должны использовать один публичный origin; reverse proxy должен сохранять Host/Origin. БД не публикует порт в базовом Compose; API опубликован только на loopback.

JWT здесь без refresh-токенов и серверного списка отзыва: выход удаляет браузерную cookie, ранее выданный токен остаётся действительным до истечения срока. Для полноценного управления сессиями предусмотрите хранение и отзыв сессий. Модули управления клубом пока не реализованы; `/dashboard` служит минимальной защищённой страницей успешного входа.

## Дизайн и фотография

Композиция, палитра и текст повторяют предоставленный макет. На мобильных экранах форма расположена первой, визуал — ниже. Маркер `T` в `src/components/brand.tsx` можно заменить SVG-логотипом.

Фотография: [Maximilian Bungart, Unsplash](https://unsplash.com/photos/green-billiard-table-with-overhead-lights-CqjdKM0CIIs), [Unsplash License](https://unsplash.com/license). Сохранена локально для воспроизводимой загрузки. Это фотография-замена по требованию Unsplash, поэтому она отличается от изображения в макете.
