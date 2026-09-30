import { redirect } from "next/navigation";
import { BookingsScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Бронирования" };
export default async function BookingsPage() { const user = await getSessionUser(); if (!user) redirect("/login"); return <BookingsScreen operatorName={user.username} />; }
