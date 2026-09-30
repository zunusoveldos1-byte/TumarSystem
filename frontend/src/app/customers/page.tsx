import { redirect } from "next/navigation";

export const metadata = { title: "TumarSystem — Клиенты" };
export default function CustomersPage() { redirect("/clients"); }
