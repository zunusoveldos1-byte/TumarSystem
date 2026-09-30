import { redirect } from "next/navigation";
import { HallScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export default async function TablesPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <HallScreen operatorName={user.username} />;
}
