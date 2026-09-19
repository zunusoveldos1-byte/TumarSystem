import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Same-origin JSON requests only; never accept cross-origin login submissions.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      // Next.js may construct nextUrl with the internal bind address (0.0.0.0).
      // Browsers cannot override Host; compare to the actual destination host.
      const source = new URL(origin);
      if (!["http:", "https:"].includes(source.protocol) || source.host !== request.headers.get("host")) {
        throw new Error("Cross-origin login");
      }
    } catch {
      return NextResponse.json({ message: "Недопустимый источник запроса" }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Ожидается JSON" }, { status: 415 });
  }
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: "Некорректный запрос" }, { status: 400 }); }
  if (!body || typeof body.username !== "string" || typeof body.password !== "string" ||
    !body.username.trim() || body.username.length > 254 || !body.password ||
    new TextEncoder().encode(body.password).length > 72 ||
    (body.remember_me !== undefined && typeof body.remember_me !== "boolean")) {
    return NextResponse.json({ message: "Проверьте логин и пароль" }, { status: 422 });
  }
  try {
    const upstream = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) {
      const message = upstream.status === 401 ? "Неверный логин или пароль" :
        upstream.status === 422 ? "Проверьте правильность введённых данных" : "Сервис временно недоступен. Попробуйте позже.";
      return NextResponse.json({ message }, { status: upstream.status >= 500 ? 503 : upstream.status });
    }
    const token = await upstream.json();
    if (typeof token.access_token !== "string" || !Number.isFinite(token.expires_in) || token.expires_in <= 0) {
      throw new Error("Invalid token response");
    }
    const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(SESSION_COOKIE, token.access_token, {
      httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax", path: "/",
      ...(body.remember_me === true ? { maxAge: token.expires_in } : {}),
    });
    return response;
  } catch {
    return NextResponse.json({ message: "Нет связи с сервером. Попробуйте позже." }, { status: 503 });
  }
}
