import { redirect } from "next/navigation";
import { ShiftScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Смена" };
export default async function ShiftPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <ShiftScreen operatorName={user.username} />; }
