import { redirect } from "next/navigation";
import { EmployeesScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Сотрудники" };
export default async function EmployeesPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <EmployeesScreen operatorName={user.username} />; }
