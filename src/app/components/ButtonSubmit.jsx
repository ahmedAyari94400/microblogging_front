"use client";

import React from "react";

export default function ButtonSubmit({
  children,
  className = "",
  isLoading = false,
}) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold px-6 py-3 rounded-2xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : children}
      </button>
    </div>
  );
}
