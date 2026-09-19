import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "tumar_session";
export const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export interface SessionUser { id: number; username: string; email: string; phone: string | null; created_at: string }

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal: AbortSignal.timeout(10000),
  });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Сервис авторизации временно недоступен");
  return response.json();
}
