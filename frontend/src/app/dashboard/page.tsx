import { Check, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";
import { getSessionUser } from "@/lib/auth";
import { logout } from "./actions";

export const metadata = { title: "TumarSystem — Личный кабинет" };

export default async function Dashboard() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <main className="dashboard">
    <header className="flex items-center justify-between gap-6"><Brand />
      <form action={logout}><button className="logout-button"><LogOut size={17} /> Выйти</button></form>
    </header>
    <section className="welcome-card">
      <span className="success-badge"><Check size={17} /> Вход выполнен</span>
      <h1>Добро пожаловать, {user.username}</h1>
      <p>Вы вошли в TumarSystem. Пространство для управления вашим клубом готово к дальнейшей настройке.</p>
      <div className="account-detail"><span>Учётная запись</span><strong>{user.email}</strong></div>
    </section>
  </main>;
}
