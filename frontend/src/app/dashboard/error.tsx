"use client";

export default function DashboardError({ reset }: { reset: () => void }) {
  return <main className="dashboard"><section className="welcome-card">
    <h1>Сервис временно недоступен</h1>
    <p>Не удалось загрузить учётную запись. Попробуйте ещё раз через несколько секунд.</p>
    <button className="login-button mt-8" onClick={reset}>Попробовать снова</button>
  </section></main>;
}
