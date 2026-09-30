import { redirect } from "next/navigation";
import { CashierScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Касса" };
export default async function CashierPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <CashierScreen operatorName={user.username} />; }
