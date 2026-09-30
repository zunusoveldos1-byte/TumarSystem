import { redirect } from "next/navigation";
import { CustomersScreen } from "@/components/club-workspace";
import { getSessionUser } from "@/lib/auth";

export default async function ClientsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <CustomersScreen operatorName={user.username} />;
}
