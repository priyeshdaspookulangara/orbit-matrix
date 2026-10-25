'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User, Wallet, Package, Network, Users, ArrowUpRight, CheckCircle2, Clock, Truck, ShieldCheck, ChevronRight, Copy, Check, Share2
} from 'lucide-react';

export default function MemberDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/user/dashboard')
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error('Failed to load dashboard data');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData) setData(resData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading Member Portal...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center max-w-md">
          <p className="text-red-400 text-sm mb-4">{error || 'Session expired'}</p>
          <a href="/login" className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg text-sm font-bold">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const { user, order, transactions, referrals, children, tree } = data;

  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/register?sponsor=${user.id}`
    : `http://localhost:3000/register?sponsor=${user.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                {user.id}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Placed at <span className="text-cyan-300 font-semibold">Level {user.level}</span> in Matrix | Parent: <span className="font-mono text-white">{user.parent_id || 'None (Root)'}</span> | Direct Sponsor: <span className="font-mono text-white">{user.sponsor_id || 'None'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Wallet Balance</div>
              <div className="text-xl font-black text-emerald-400 font-mono">
                ₹{user.wallet_balance.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Share Referral Link Card */}
        <div className="glass-card p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Share Your Referral Link
                <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Earn ₹1,000 / Referral
                </span>
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Share this custom URL with prospective distributors to automatically assign your Sponsor ID ({user.id}) during sign up.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="w-full md:w-80 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Core Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Matrix Level</span>
              <Network className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">Level {user.level}</div>
            <div className="text-xs text-cyan-400 mt-2 font-mono">Depth Tier {user.level} / 5</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Direct Children</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{user.children_count} / 10</div>
            <div className="text-xs text-slate-400 mt-2">Max Capacity: 10 per parent</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Direct Referrals</span>
              <ArrowUpRight className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{referrals.length}</div>
            <div className="text-xs text-emerald-400 mt-2 font-mono">
              ₹{(referrals.length * 1000).toLocaleString('en-IN')} Bonus Earned
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Fulfillment Status</span>
              <Package className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white">
              {order?.fulfillment_status || 'Processing'}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Flavor: <span className="text-cyan-300 font-semibold">{order?.flavor || 'Chocolate'}</span>
            </div>
          </div>
        </div>

        {/* Order Fulfillment Status Card */}
        {order && (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Distributor Package Dispatch Tracker
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{order.package_name}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Order ID: <span className="font-mono text-slate-200">{order.id}</span> | Flavor:{' '}
                  <span className="text-cyan-400">{order.flavor}</span>
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                Tracking: <span className="font-mono text-cyan-400">{order.tracking_number || 'Pending Dispatch'}</span>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className={`p-4 rounded-2xl border text-center transition-all ${
                ['Processing', 'Dispatched', 'Delivered'].includes(order.fulfillment_status)
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <Clock className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">1. Processing</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Order Received</div>
              </div>

              <div className={`p-4 rounded-2xl border text-center transition-all ${
                ['Dispatched', 'Delivered'].includes(order.fulfillment_status)
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <Truck className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">2. Dispatched</div>
                <div className="text-[10px] text-slate-400 mt-0.5">In Transit</div>
              </div>

              <div className={`p-4 rounded-2xl border text-center transition-all ${
                order.fulfillment_status === 'Delivered'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-bold">3. Delivered</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Delivered to Doorstep</div>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-300 font-semibold">Shipping Address: </span>
              {order.shipping_address}
            </div>
          </div>
        )}

        {/* Matrix Downline Tree Inspector */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-2">My Matrix Subtree View</h3>
          <p className="text-xs text-slate-400 mb-6">
            Showing children placed beneath your node ({user.id}) in the 10-matrix structure.
          </p>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
            {tree ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl w-fit">
                  <span className="font-mono text-cyan-400 font-bold text-sm">{tree.id}</span>
                  <span className="text-xs text-white font-medium">{tree.name}</span>
                  <span className="text-[10px] bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                    YOU (L{tree.level})
                  </span>
                </div>

                {tree.children && tree.children.length > 0 ? (
                  <div className="pl-6 border-l-2 border-cyan-500/30 space-y-3">
                    {tree.children.map((child: any) => (
                      <div key={child.id} className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
                          <ChevronRight className="w-4 h-4 text-cyan-400" />
                          <span className="font-mono text-cyan-300 font-bold text-xs">{child.id}</span>
                          <span className="text-xs text-slate-200">{child.name}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            Children: {child.children_count}/10
                          </span>
                        </div>

                        {child.children && child.children.length > 0 && (
                          <div className="pl-6 border-l-2 border-slate-800 space-y-2">
                            {child.children.map((grandChild: any) => (
                              <div key={grandChild.id} className="flex items-center gap-3 p-2 bg-slate-900/60 border border-slate-800/80 rounded-lg w-fit text-xs">
                                <span className="font-mono text-slate-300 font-bold">{grandChild.id}</span>
                                <span className="text-slate-400">{grandChild.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 pl-4 py-2 italic">
                    No matrix children placed directly under your node yet. Auto-spillover queue active.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Tree loading...</p>
            )}
          </div>
        </div>

        {/* Transactions & Direct Referrals Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Ledger */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4">Wallet Transactions</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {transactions && transactions.length > 0 ? (
                transactions.map((tx: any) => (
                  <div key={tx.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-white font-medium">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{tx.created_at}</div>
                    </div>
                    <div className={`font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {tx.amount > 0 ? `+₹${tx.amount}` : `₹${tx.amount}`}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-4 text-center">No transactions recorded yet.</p>
              )}
            </div>
          </div>

          {/* Sponsored Members */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4">My Direct Referrals ({referrals.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {referrals && referrals.length > 0 ? (
                referrals.map((ref: any) => (
                  <div key={ref.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-white font-semibold">{ref.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{ref.id}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
                        Level {ref.level}
                      </span>
                      <div className="text-[10px] text-emerald-400 mt-1 font-semibold">+₹1,000 Earned</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-4 text-center">You haven't referred any members directly yet.</p>
              )}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
