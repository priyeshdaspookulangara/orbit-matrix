'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Shield, Zap, User, LogOut, Menu, X, Dumbbell } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800/80 bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                ORB<span className="text-cyan-400 font-black">MATRIX</span>
              </span>
              <p className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase -mt-1">
                Protein Direct
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About Brand</Link>
            <Link href="/business-plan" className="hover:text-cyan-400 transition-colors">Business Plan</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </nav>

          {/* User Auth Controls */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/50 transition-all"
                  >
                    Admin Portal
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/50 transition-all"
                  >
                    Member Portal ({user.id})
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Join Matrix (₹6,000)
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link href="/" className="block py-2 text-slate-300 hover:text-cyan-400">Home</Link>
          <Link href="/about" className="block py-2 text-slate-300 hover:text-cyan-400">About Brand</Link>
          <Link href="/business-plan" className="block py-2 text-slate-300 hover:text-cyan-400">Business Plan</Link>
          <Link href="/contact" className="block py-2 text-slate-300 hover:text-cyan-400">Contact</Link>
          <div className="pt-4 border-t border-slate-800 space-y-2">
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="block w-full text-center py-2 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded-lg font-semibold">
                  Go to {user.role === 'admin' ? 'Admin Portal' : 'Member Portal'}
                </Link>
                <button onClick={handleLogout} className="block w-full text-center py-2 text-red-400 hover:bg-slate-800/60 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block w-full text-center py-2 text-slate-300 border border-slate-700 rounded-lg">
                  Sign In
                </Link>
                <Link href="/register" className="block w-full text-center py-2 bg-cyan-400 text-slate-950 rounded-lg font-bold">
                  Join Matrix (₹6,000)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
