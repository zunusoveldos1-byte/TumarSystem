import type { ReactNode } from "react";
import type { FeaturesCopy } from "@/lib/features-content";
import type { FeatureStatus } from "@/models/features";

export function FeatureBadge({ copy, status }: { copy: FeaturesCopy; status: FeatureStatus }) {
  return <span className={`eco-badge eco-badge-${status}`}><i />{copy.statuses[status]}</span>;
}
export function DemoNote({ copy }: { copy: FeaturesCopy }) {
  return <div className="eco-demo-note"><span>{copy.demoLabel}</span><p>{copy.demoNote}</p></div>;
}
export function Story({ id, label, title, text, children, wide = false }: { id: string; label: string; title: string; text: string; children: ReactNode; wide?: boolean }) {
  return <section id={id} className={`eco-story${wide ? " eco-story-wide" : ""}`}><div className="eco-story-intro"><span className="eco-eyebrow">{label}</span><h2>{title}</h2><p>{text}</p></div>{children}</section>;
}
