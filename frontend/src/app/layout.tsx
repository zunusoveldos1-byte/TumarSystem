import type { Metadata } from "next";
import "./globals.css";
import "./marketing.css";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: "TumarSystem — система управления бильярдным клубом", template: "%s | TumarSystem" },
  description: "TumarSystem объединяет управление столами, кассой, сменами, CRM и Smart Lighting для бильярдного клуба.",
  openGraph: { title: "TumarSystem — весь клуб в одной системе", description: "Управление бильярдным клубом: software, CRM и Smart Hardware.", type: "website" },
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/" } : undefined,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
