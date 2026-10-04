import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { Brand } from "@/components/brand";

const sections = {
  settings: ["Настройки", "Настройки клуба и безопасности появятся после подключения модели клуба."],
  subscription: ["Подписка", "Информация о подписке будет доступна после подключения биллинга."],
  users: ["Пользователи", "Управление ролями Owner, Administrator, Cashier и Manager находится в разработке."],
  services: ["Дополнительные услуги", "Заявки на модули, интеграции и оборудование появятся после подключения канала связи."],
} as const;

export function generateStaticParams() { return Object.keys(sections).map(section => ({ section })); }

export default async function AccountSection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!(section in sections)) notFound();
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const [title, description] = sections[section as keyof typeof sections];
  return <main className="dashboard"><header className="flex items-center justify-between gap-6"><Brand/><Link className="logout-button" href="/dashboard">В кабинет</Link></header><section className="welcome-card"><span className="success-badge">ЛИЧНЫЙ КАБИНЕТ / {title.toUpperCase()}</span><h1>{title}</h1><p>{description}</p><div className="account-detail"><span>Учётная запись</span><strong>{user.email}</strong></div></section></main>;
}
