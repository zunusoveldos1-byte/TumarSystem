import { redirect } from "next/navigation";
import { TariffsScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Тарифы" };
export default async function TariffsPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <TariffsScreen operatorName={user.username} />; }
