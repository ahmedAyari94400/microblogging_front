'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
            <Link href="/">🌍 Travelers</Link>
          </div>

          {/* Liens */}
          <div className="space-x-6 text-gray-700 font-medium hidden md:flex">
            <Link href="/">Accueil</Link>
          </div>

          {/* Bouton */}
          <div className="hidden md:flex">
            <Link href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-sm transition">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}