import Image from "next/image";
import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="login-layout">
      <section className="auth-panel" aria-labelledby="welcome-title">
        <header><Brand /></header>
        <div className="auth-content">
          <h1 id="welcome-title">Добро пожаловать</h1>
          <LoginForm />
        </div>
      </section>
      <section className="visual-panel" aria-label="Атмосфера бильярдного клуба">
        <Image src="/images/billiards.jpg" alt="Бильярдный стол с зелёным сукном в вечернем свете"
          fill priority sizes="(max-width: 760px) 100vw, 61vw" className="billiards-image" />
        <div className="visual-shade" />
        <div className="visual-copy">
          <h2>Вечерняя атмосфера.<br /><span>Полный контроль.</span></h2>
          <div className="gold-rule" />
          <p>Бильярдный клуб нового уровня</p>
        </div>
        <a className="photo-credit" href="https://unsplash.com/photos/CqjdKM0CIIs" target="_blank" rel="noreferrer">
          Maximilian Bungart / Unsplash
        </a>
      </section>
    </main>
  );
}
