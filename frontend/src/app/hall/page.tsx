import { redirect } from "next/navigation";

export const metadata = { title: "TumarSystem — Зал и столы" };
export default function HallPage() { redirect("/tables"); }
