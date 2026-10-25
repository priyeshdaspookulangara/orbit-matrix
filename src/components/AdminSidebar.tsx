'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  LogOut,
  Dumbbell,
  Network
} from 'lucide-react';

interface AdminSidebarProps {
  stats?: {
    totalMembers: number;
    totalRevenue: number;
    totalCommissions: number;
  };
}

export default function AdminSidebar({ stats }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  const navItems = [
    { label: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Public Website', href: '/', icon: Dumbbell },
    { label: 'Business Plan', href: '/business-plan', icon: Network },
  ];

  return (
    <aside className="w-64 bg-slate-950/90 border-r border-slate-800/80 flex flex-col justify-between p-5 min-h-screen text-slate-300 shrink-0">
      <div className="space-y-6">
        {/* Brand Admin Header */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
              ORB<span className="text-cyan-400">ADMIN</span>
            </span>
            <p className="text-[9px] text-cyan-400/80 font-mono tracking-widest uppercase -mt-1">
              Central Control HQ
            </p>
          </div>
        </Link>

        {/* Quick Financial Summary Badge */}
        {stats && (
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Platform Revenue:</span>
              <span className="text-emerald-400 font-mono font-bold">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Distributors:</span>
              <span className="text-cyan-400 font-mono font-bold">
                {stats.totalMembers} Members
              </span>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Admin Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-slate-900">
        <button
          onClick={handleLogout}
          className="w-full px-3.5 py-2.5 bg-slate-900 hover:bg-red-950/40 hover:text-red-400 text-slate-400 border border-slate-800 hover:border-red-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Exit Admin HQ
        </button>
      </div>
    </aside>
  );
}
