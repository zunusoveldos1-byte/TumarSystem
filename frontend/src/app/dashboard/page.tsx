import { redirect } from "next/navigation";
import { DashboardScreen } from "@/components/dashboard-screen";
import { getSessionUser } from "@/lib/auth";

export const metadata = { title: "TumarSystem — Обзор клуба" };

export default async function Dashboard() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <DashboardScreen operatorName={user.username} />;
}
