'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Network,
  Wallet,
  Package,
  Users,
  LogOut,
  Dumbbell,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';

interface MemberSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    level: number;
    wallet_balance: number;
  };
}

export default function MemberSidebar({ user }: MemberSidebarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/register?sponsor=${user.id}`
    : `http://localhost:3000/register?sponsor=${user.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  const navItems = [
    { label: 'Overview & Matrix', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Public Home', href: '/', icon: Dumbbell },
    { label: 'Business Plan', href: '/business-plan', icon: Network },
  ];

  return (
    <aside className="w-64 bg-slate-950/90 border-r border-slate-800/80 flex flex-col justify-between p-5 min-h-screen text-slate-300 shrink-0">
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Dumbbell className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              ORB<span className="text-cyan-400">MATRIX</span>
            </span>
            <p className="text-[9px] text-cyan-400/80 font-mono tracking-widest uppercase -mt-1">
              Member Portal
            </p>
          </div>
        </Link>

        {/* User Badge */}
        <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs font-bold text-white truncate">{user.name}</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-cyan-400 font-bold">{user.id}</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
              Level {user.level}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Wallet:</span>
            <span className="text-emerald-400 font-mono font-bold">
              ₹{user.wallet_balance.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Navigation
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

        {/* Referral Quick Copy */}
        <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-cyan-500/30 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-[11px]">
            <Share2 className="w-3.5 h-3.5 text-cyan-400" /> Share Referral Link
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Earn ₹1,000 direct bonus for every active sign-up.
          </p>
          <button
            onClick={handleCopyLink}
            className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-[11px] transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-cyan-500/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-950" /> Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-slate-900">
        <button
          onClick={handleLogout}
          className="w-full px-3.5 py-2.5 bg-slate-900 hover:bg-red-950/40 hover:text-red-400 text-slate-400 border border-slate-800 hover:border-red-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
