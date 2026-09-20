import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="login-layout">
      <section className="auth-panel" aria-labelledby="welcome-title">
        <div className="auth-content">
          <h1 id="welcome-title">Вход в систему</h1>
          <p className="auth-subtitle">Войдите, чтобы начать рабочую смену.</p>
          <LoginForm />
        </div>
      </section>
      <section className="visual-panel" aria-label="Атмосфера бильярдного клуба">
        <Image src="/images/login-billiards-reference-hero.png" alt="Бильярдный стол с зелёным сукном в вечернем свете"
          fill priority sizes="(max-width: 760px) 100vw, 53vw" className="billiards-image" />
        <div className="visual-shade" />
      </section>
    </main>
  );
}
