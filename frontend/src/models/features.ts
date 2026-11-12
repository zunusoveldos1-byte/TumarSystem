export type SiteLanguage = "ru" | "ky" | "en";
export type FeatureCategory = "core" | "business" | "smart" | "developer" | "ai" | "custom";
export type FeatureStatus = "available" | "beta" | "development" | "soon" | "custom";
export type FeatureId = "tables" | "timer" | "pos" | "shifts" | "bookings" | "tariffs" | "crm" | "inventory" | "kitchen" | "staff" | "analytics" | "printing" | "lighting" | "arduino" | "esp32" | "automation" | "api" | "webhooks" | "integrations" | "ai" | "help" | "custom" | "currencies" | "languages" | "cloud" | "mobile";
export interface FeatureDefinition { id: FeatureId; category: FeatureCategory; status: FeatureStatus; section: string }
export type FeatureTranslation = readonly [title: string, description: string];
export type SessionState = "running" | "paused" | "finished";
export interface CartLine { id: number; quantity: number }

export function formatDuration(seconds: number): string {
  return [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60].map(value => String(value).padStart(2, "0")).join(":");
}

export function calculateSessionCost(seconds: number, hourlyRate: number, discountPercent = 0): number {
  return Math.round(seconds * hourlyRate / 3600 * (1 - discountPercent / 100));
}

export function formatKgs(value: number, language: SiteLanguage): string {
  return new Intl.NumberFormat(language === "ky" ? "ru-KG" : language, { maximumFractionDigits: 0 }).format(value);
}
