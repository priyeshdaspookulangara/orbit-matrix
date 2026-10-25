'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Shield, Zap, AlertCircle, CheckCircle } from 'lucide-react';

function RegisterForm() {
  const searchParams = useSearchParams();
  const urlSponsor = searchParams.get('sponsor')?.trim().toUpperCase();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sponsorId: urlSponsor || 'ORB00000',
    flavor: 'Chocolate',
    shippingAddress: ''
  });

  useEffect(() => {
    if (urlSponsor) {
      setFormData((prev) => ({ ...prev, sponsorId: urlSponsor }));
    }
  }, [urlSponsor]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccessData(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-slate-800">
      {urlSponsor && !successData && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs flex items-center justify-between">
          <span>
            You were invited by Sponsor: <strong className="font-mono text-white">{urlSponsor}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px]">
            AUTO-LINKED
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {successData ? (
        <div className="p-4 rounded-3xl border border-emerald-500/40 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
            <p className="text-slate-300 text-sm mt-1">Welcome to the Matrix ecosystem.</p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-left space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Assigned Member ID:</span>
              <span className="text-cyan-400 font-bold">{successData.userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Auto-Placed Parent Node:</span>
              <span className="text-cyan-400 font-bold">{successData.parentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Placement Level:</span>
              <span className="text-cyan-400 font-bold">Level {successData.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Direct Sponsor ID:</span>
              <span className="text-cyan-400 font-bold">{successData.sponsorId}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 mt-2">
              <span className="text-slate-400">Order ID:</span>
              <span className="text-emerald-400 font-bold">{successData.orderId}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block w-full py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:brightness-110"
            >
              Proceed to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Direct Sponsor ID (Defaults to Root Admin ORB00000)
            </label>
            <input
              type="text"
              required
              value={formData.sponsorId}
              onChange={(e) => setFormData({ ...formData, sponsorId: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-cyan-400 font-mono uppercase focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Protein Tub Flavor (1kg Kit)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, flavor: 'Chocolate' })}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  formData.flavor === 'Chocolate'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🍫 Chocolate
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, flavor: 'Vanilla' })}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  formData.flavor === 'Vanilla'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🍦 Vanilla
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shipping Address</label>
            <textarea
              rows={3}
              required
              placeholder="House/Street/City/Pincode address for 1kg Protein Tub dispatch..."
              value={formData.shippingAddress}
              onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between font-semibold text-slate-200">
              <span>Activation Kit Total:</span>
              <span className="text-cyan-400 font-mono">₹6,000</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Includes Direct Sponsor Referral (₹1,000) & 5-Level Parent Chain Matrix Distribution (₹200/level).
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-black rounded-xl text-base transition-all shadow-lg shadow-cyan-500/20"
          >
            {loading ? 'Processing Registration & Spillover...' : 'Register & Pay ₹6,000'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Join ORBMATRIX Network</h1>
          <p className="text-slate-400 text-sm mt-1">
            ₹6,000 Package Kit includes 1kg Whey Protein Tub + Instant Matrix Activation
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-400 text-sm py-12">Loading form...</div>}>
          <RegisterForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
