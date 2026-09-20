import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic", "latin"], display: "swap" });

export const metadata: Metadata = {
  title: "TumarSystem — Вход",
  description: "TumarSystem — управление бильярдным клубом нового уровня.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body className={inter.className}>{children}</body></html>;
}
