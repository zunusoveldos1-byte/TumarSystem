import { redirect } from "next/navigation";
import { SettingsScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Настройки" };
export default async function SettingsPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <SettingsScreen operatorName={user.username} />; }
