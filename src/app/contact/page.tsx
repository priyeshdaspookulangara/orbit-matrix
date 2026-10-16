'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Warehouse, Headphones } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Distributor Support & Dispatch
          </span>
          <h1 className="text-4xl font-black text-white mt-4">
            Contact Support & Logistics HQ
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            Have questions about package fulfillment, matrix placements, or wallet withdrawals? Our support team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Central Warehouse & Fulfillment Hub</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Plot 42, Cyber Logistics Park, Phase-II, Tech City, Bengaluru, India
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Distributor Desk & Support</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Email: support@orbmatrix.com | Toll Free: 1800-102-6000
                </p>
                <p className="text-xs text-cyan-400 mt-1">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Send Support Inquiry</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); }}>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Distributor Name"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Member ID / Email</label>
                <input
                  type="text"
                  required
                  placeholder="ORB00001 or email@domain.com"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Message / Issue</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your query regarding dispatch, tracking, or matrix node..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm hover:bg-cyan-300 transition-all"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
