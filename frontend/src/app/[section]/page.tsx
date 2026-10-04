import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/marketing-page";
import type { MarketingRoute } from "@/lib/marketing";

const routes: MarketingRoute[] = ["features", "crm", "smart", "demo", "pricing", "faq", "contact", "company", "details", "register"];

export function generateStaticParams() { return routes.map(section => ({ section })); }

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const titles: Record<string, string> = { features: "Возможности", crm: "CRM Beta", smart: "Smart Lighting", demo: "Демо", pricing: "Тарифы", faq: "Частые вопросы", contact: "Контакты", company: "О компании", details: "Реквизиты", register: "Получить доступ" };
  return { title: titles[section] ?? "Страница", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `/${section}` } : undefined };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!routes.includes(section as MarketingRoute)) notFound();
  return <MarketingPage page={section as MarketingRoute} />;
}
