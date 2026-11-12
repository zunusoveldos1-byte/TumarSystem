import type { Metadata } from "next";
import { EcosystemFeatures } from "@/components/ecosystem-features";
import "./features.css";

export const metadata: Metadata = {
  title: "Возможности TumarSystem — цифровая экосистема клуба",
  description: "Столы, касса, CRM, аналитика и будущие интеграции TumarSystem. Интерактивные демонстрации на русском, кыргызском и английском.",
  robots: { index: true, follow: true },
};

export default function FeaturesPage() { return <EcosystemFeatures/>; }
