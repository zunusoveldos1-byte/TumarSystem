"use client";

import { Check, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<{ username?: string; password?: string }>({});
  const recovery = useRef<HTMLDialogElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || success) return;
    const data = new FormData(event.currentTarget);
    const username = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const errors: typeof fields = {};
    if (!username) errors.username = "Введите логин, телефон или email";
    if (!password) errors.password = "Введите пароль";
    else if (new TextEncoder().encode(password).length > 72) errors.password = "Пароль не должен превышать 72 байта";
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
        throw new Error(result?.message ?? "Не удалось войти. Попробуйте ещё раз.");
      }
      if (result?.success !== true) throw new Error("Не удалось подтвердить вход. Попробуйте ещё раз.");
      setSuccess(true);
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof TypeError ? "Нет связи с сервером. Проверьте подключение." :
        cause instanceof Error ? cause.message : "Не удалось войти.");
    } finally {
      setLoading(false);
    }
  }

  return <>
    <form onSubmit={submit} noValidate className="login-form" aria-busy={loading}>
      <div className="field-group">
        <label htmlFor="username">Логин, телефон или email</label>
        <div className={`input-shell ${fields.username ? "invalid" : ""}`}>
          <UserRound size={18} aria-hidden="true" />
          <input id="username" name="username" autoComplete="username" placeholder="Введите логин"
            maxLength={254} required disabled={loading || success} aria-invalid={!!fields.username}
            aria-describedby={fields.username ? "username-error" : undefined} />
        </div>
        {fields.username && <p id="username-error" className="field-error" role="alert">{fields.username}</p>}
      </div>
      <div className="field-group">
        <label htmlFor="password">Пароль</label>
        <div className={`input-shell ${fields.password ? "invalid" : ""}`}>
          <LockKeyhole size={18} aria-hidden="true" />
          <input id="password" name="password" type={visible ? "text" : "password"}
            autoComplete="current-password" placeholder="Введите пароль" required
            disabled={loading || success} aria-invalid={!!fields.password}
            aria-describedby={fields.password ? "password-error" : undefined} />
          <button type="button" className="password-toggle" onClick={() => setVisible(!visible)}
            aria-label={visible ? "Скрыть пароль" : "Показать пароль"} aria-pressed={visible}>
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {fields.password && <p id="password-error" className="field-error" role="alert">{fields.password}</p>}
      </div>
      <div className="form-options">
        <label className="remember-control">
          <input type="checkbox" name="remember_me" defaultChecked disabled={loading || success} />
          <span className="checkbox-mark" aria-hidden="true"><Check size={15} strokeWidth={3} /></span>
          <span>Запомнить меня</span>
        </label>
        <button className="recovery-link" type="button" onClick={() => recovery.current?.showModal()}>Забыли пароль?</button>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="login-button" disabled={loading || success}>
        {loading ? <><LoaderCircle size={19} className="animate-spin" /> Входим…</> :
          success ? <><Check size={19} /> Вход выполнен</> : "Войти"}
      </button>
      <span role="status" className="sr-only">{success ? "Вход выполнен. Открываем личный кабинет." : loading ? "Проверяем данные" : ""}</span>
    </form>
    <dialog ref={recovery} className="recovery-dialog" aria-labelledby="recovery-title"
      onClick={event => { if (event.target === event.currentTarget) recovery.current?.close(); }}>
      <button className="dialog-close" aria-label="Закрыть" onClick={() => recovery.current?.close()}><X size={20} /></button>
      <div className="dialog-icon"><LockKeyhole size={24} /></div>
      <h2 id="recovery-title">Восстановление доступа</h2>
      <p>Обратитесь к администратору вашего клуба, чтобы восстановить доступ к учётной записи.</p>
      <button className="login-button" onClick={() => recovery.current?.close()}>Понятно</button>
    </dialog>
  </>;
}
