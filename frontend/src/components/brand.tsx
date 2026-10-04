import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="TumarSystem — главная">
      <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="28" height="28" fill="none"><circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5"/><circle cx="20" cy="20" r="4" fill="currentColor"/><path d="M8 32 31 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
      <span className="brand-copy">
        <span className="brand-name">TumarSystem</span>
        <span className="brand-caption">Billiard Club Management</span>
      </span>
    </Link>
  );
}
