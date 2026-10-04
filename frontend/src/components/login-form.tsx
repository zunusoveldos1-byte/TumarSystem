"use client";

import { Check, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Language } from "@/lib/marketing";

const words = {
  ru: { username: "Логин", password: "Пароль", remember: "Запомнить меня", enter: "Войти", entering: "Входим…", done: "Вход выполнен", show: "Показать пароль", hide: "Скрыть пароль", userRequired: "Введите логин, телефон или email", passwordRequired: "Введите пароль", tooLong: "Пароль не должен превышать 72 байта", failed: "Не удалось войти. Попробуйте ещё раз.", unconfirmed: "Не удалось подтвердить вход. Попробуйте ещё раз.", offline: "Нет связи с сервером. Проверьте подключение.", opening: "Вход выполнен. Открываем личный кабинет.", checking: "Проверяем данные" },
  ky: { username: "Логин", password: "Сырсөз", remember: "Эстеп калуу", enter: "Кирүү", entering: "Кирүүдө…", done: "Кирдиңиз", show: "Сырсөздү көрсөтүү", hide: "Сырсөздү жашыруу", userRequired: "Логин, телефон же email киргизиңиз", passwordRequired: "Сырсөздү киргизиңиз", tooLong: "Сырсөз 72 байттан ашпашы керек", failed: "Кирүү ишке ашкан жок. Кайра аракет кылыңыз.", unconfirmed: "Кирүү ырасталган жок. Кайра аракет кылыңыз.", offline: "Сервер менен байланыш жок. Туташууңузду текшериңиз.", opening: "Кирдиңиз. Жеке кабинет ачылууда.", checking: "Маалымат текшерилүүдө" },
  en: { username: "Username", password: "Password", remember: "Remember me", enter: "Sign in", entering: "Signing in…", done: "Signed in", show: "Show password", hide: "Hide password", userRequired: "Enter username, phone or email", passwordRequired: "Enter your password", tooLong: "Password must not exceed 72 bytes", failed: "Sign in failed. Please try again.", unconfirmed: "Could not confirm sign in. Please try again.", offline: "Cannot reach the server. Check your connection.", opening: "Signed in. Opening your account.", checking: "Checking credentials" },
};

export function LoginForm({ lang = "ru" }: { lang?: Language }) {
  const w = words[lang];
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<{ username?: string; password?: string }>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || success) return;
    const data = new FormData(event.currentTarget);
    const username = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const errors: typeof fields = {};
    if (!username) errors.username = w.userRequired;
    if (!password) errors.password = w.passwordRequired;
    else if (new TextEncoder().encode(password).length > 72) errors.password = w.tooLong;
    setFields(errors);
    setError("");
    if (Object.keys(errors).length) return;
    setLoading(true);
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, remember_me: data.get("remember_me") === "on" }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(lang === "ru" ? (result?.message ?? w.failed) : w.failed);
      }
      if (result?.success !== true) throw new Error(w.unconfirmed);
      setSuccess(true);
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof TypeError ? w.offline :
        cause instanceof Error ? cause.message : w.failed);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <form onSubmit={submit} noValidate className="login-form" aria-busy={loading}>
      <div className="field-group">
        <label htmlFor="username">{w.username}</label>
        <div className={`input-shell ${fields.username ? "invalid" : ""}`}>
          <UserRound size={18} aria-hidden="true" />
          <input id="username" name="username" autoComplete="username"
            maxLength={254} required disabled={loading || success} aria-invalid={!!fields.username}
            aria-describedby={fields.username ? "username-error" : undefined} />
        </div>
        {fields.username && <p id="username-error" className="field-error" role="alert">{fields.username}</p>}
      </div>
      <div className="field-group">
        <label htmlFor="password">{w.password}</label>
        <div className={`input-shell ${fields.password ? "invalid" : ""}`}>
          <LockKeyhole size={18} aria-hidden="true" />
          <input id="password" name="password" type={visible ? "text" : "password"}
            autoComplete="current-password" required
            disabled={loading || success} aria-invalid={!!fields.password}
            aria-describedby={fields.password ? "password-error" : undefined} />
          <button type="button" className="password-toggle" onClick={() => setVisible(!visible)}
            aria-label={visible ? w.hide : w.show} aria-pressed={visible}>
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {fields.password && <p id="password-error" className="field-error" role="alert">{fields.password}</p>}
      </div>
      <div className="form-options">
        <label className="remember-control">
          <input type="checkbox" name="remember_me" defaultChecked disabled={loading || success} />
          <span className="checkbox-mark" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
          <span>{w.remember}</span>
        </label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="login-button" disabled={loading || success}>
        {loading ? <><LoaderCircle size={19} className="animate-spin" /> {w.entering}</> :
          success ? <><Check size={19} /> {w.done}</> : <><span>{w.enter}</span><span className="button-arrow" aria-hidden="true">→</span></>}
      </button>
      <span role="status" className="sr-only">{success ? w.opening : loading ? w.checking : ""}</span>
    </form>
  </>;
}
