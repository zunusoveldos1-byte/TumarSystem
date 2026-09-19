import Link from "next/link";

export function Brand() {
  return (
    <Link href="/login" className="brand" aria-label="TumarSystem — главная">
      {/* Replace this mark with the future SVG logo. */}
      <span className="brand-mark" aria-hidden="true">T</span>
      <span className="brand-copy">
        <span className="brand-name">TumarSystem</span>
        <span className="brand-caption">Billiard Club Management</span>
      </span>
    </Link>
  );
}
