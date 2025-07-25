"use client";

import Link from "next/link";

export default function ButtonLink({ href, children, className = "" }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className={`bg-emerald-500 hover:bg-emerald-600 text-white text-xl font-bold px-6 py-3 rounded-2xl shadow-sm transition ${className}`}
      >
        {children}
      </Link>
    </div>
  );
}
