import type { FeatureDefinition } from "@/models/features";

export const featureDefinitions: FeatureDefinition[] = [
  { id: "tables", category: "core", status: "beta", section: "sessions" },
  { id: "timer", category: "core", status: "beta", section: "sessions" },
  { id: "pos", category: "core", status: "beta", section: "pos" },
  { id: "shifts", category: "core", status: "beta", section: "sessions" },
  { id: "bookings", category: "core", status: "beta", section: "sessions" },
  { id: "tariffs", category: "core", status: "development", section: "rates" },
  { id: "crm", category: "business", status: "beta", section: "relationships" },
  { id: "inventory", category: "business", status: "development", section: "stock" },
  { id: "kitchen", category: "business", status: "custom", section: "stock" },
  { id: "staff", category: "business", status: "development", section: "relationships" },
  { id: "analytics", category: "business", status: "beta", section: "analytics" },
  { id: "printing", category: "business", status: "development", section: "pos" },
  { id: "lighting", category: "smart", status: "development", section: "hardware" },
  { id: "arduino", category: "smart", status: "development", section: "hardware" },
  { id: "esp32", category: "smart", status: "development", section: "hardware" },
  { id: "automation", category: "smart", status: "development", section: "hardware" },
  { id: "api", category: "developer", status: "development", section: "developer" },
  { id: "webhooks", category: "developer", status: "development", section: "developer" },
  { id: "integrations", category: "developer", status: "custom", section: "developer" },
  { id: "ai", category: "ai", status: "development", section: "assistant" },
  { id: "help", category: "ai", status: "development", section: "assistant" },
  { id: "custom", category: "custom", status: "custom", section: "custom" },
  { id: "currencies", category: "core", status: "development", section: "access" },
  { id: "languages", category: "core", status: "available", section: "access" },
  { id: "cloud", category: "core", status: "development", section: "access" },
  { id: "mobile", category: "core", status: "available", section: "access" },
];

export const productPrices = [180, 70, 320, 190, 100, 140];
export const productCategories = ["drink", "drink", "food", "food", "goods", "drink"] as const;
export const apiPreview = [
  { method: "GET", path: "/tables", body: '{\n  "tables": [{\n    "id": "04",\n    "status": "active",\n    "currency": "KGS"\n  }]\n}' },
  { method: "POST", path: "/sessions", body: '{\n  "table_id": "04",\n  "rate_id": "evening",\n  "currency": "KGS"\n}' },
  { method: "POST", path: "/sessions/{id}/pause", body: '{\n  "session_id": "demo-04",\n  "status": "paused"\n}' },
  { method: "POST", path: "/sessions/{id}/resume", body: '{\n  "session_id": "demo-04",\n  "status": "active"\n}' },
  { method: "POST", path: "/sessions/{id}/stop", body: '{\n  "session_id": "demo-04",\n  "status": "finished",\n  "amount": 620,\n  "currency": "KGS"\n}' },
];
export const webhookEvents = ["Session Started", "Session Paused", "Session Resumed", "Session Finished", "Session Cancelled"];
