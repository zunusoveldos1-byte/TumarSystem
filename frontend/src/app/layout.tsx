import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TumarSystem — Вход",
  description: "TumarSystem — управление бильярдным клубом нового уровня.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
