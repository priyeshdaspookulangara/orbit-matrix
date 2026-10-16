import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Zap, TrendingUp, Cpu, Award, PackageCheck, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-800/60">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-8 shadow-lg shadow-cyan-500/10">
            <Zap className="w-4 h-4 text-cyan-400" /> Company-Wide 10-Matrix BFS Auto-Spillover Engine
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Fuel Your Body with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Pure Protein</span>. Empower Your Wealth.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Join India’s premier direct selling protein powder platform. Premium 1kg pure whey tubs backed by an automated, transparent 10-matrix forced spillover financial ecosystem.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-extrabold rounded-xl text-base shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Get Started for ₹6,000 <TrendingUp className="w-5 h-5" />
            </Link>
            <Link
              href="/business-plan"
              className="w-full sm:w-auto px-8 py-4 glass-card border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-bold rounded-xl text-base transition-all"
            >
              Explore Matrix Structure
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">₹6,000</div>
              <div className="text-xs text-slate-400 mt-1">Package Kit Cost</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">₹1,000</div>
              <div className="text-xs text-slate-400 mt-1">Direct Referral Bonus</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">₹200</div>
              <div className="text-xs text-slate-400 mt-1">Matrix Level Bonus (x5)</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">Strict BFS</div>
              <div className="text-xs text-slate-400 mt-1">Auto-Spillover Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">1kg Pure Whey Protein Tub</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Included in every ₹6,000 distributor activation kit. Choice of gourmet flavors with fast doorstep fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chocolate Flavor */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/20 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full uppercase">
                  Best Seller
                </span>
                <PackageCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Double Belgian Chocolate</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Rich cocoa taste infused with ultra-filtered whey protein isolate & concentrate. 26g protein, 5.5g BCAAs per scoop.
              </p>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-300">
                <span>Serving: 30 Scoops</span>
                <span>Includes Business Activation</span>
              </div>
            </div>

            {/* Vanilla Flavor */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl transition-all" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase">
                  Classic
                </span>
                <PackageCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">French Vanilla Bean</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Smooth creamy vanilla flavor ideal for post-workout shakes and smoothies. Zero added sugar, digestive enzymes included.
              </p>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-300">
                <span>Serving: 30 Scoops</span>
                <span>Includes Business Activation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Features */}
      <section className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Engineered for Automated Spillover</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Our company-wide Breadth-First Search (BFS) matrix algorithm ensures fair placement and continuous growth for all distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Strict BFS Spillover</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                New distributors auto-fill level by level from top to bottom, left to right. No dead spots or unassigned vacancies.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">10-Child Max Capacity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each parent node supports exactly 10 direct children. Excess referrals auto-spill to support downline team members.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">5-Level Uplines</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Earn ₹200 level commission for every new member in your 5-level matrix tree, plus ₹1,000 for direct sponsor sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center glass-card p-12 rounded-3xl border border-cyan-500/30 relative z-10 shadow-2xl">
          <h2 className="text-3xl font-black text-white">Ready to Claim Your Place in the Matrix?</h2>
          <p className="text-slate-300 mt-3 text-sm max-w-xl mx-auto">
            Root sponsor ID: <span className="font-mono text-cyan-400 font-bold">ORB00000</span>. Join today to get your 1kg Whey Protein Tub dispatched and start earning.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-slate-950 font-black rounded-xl hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
            >
              Register & Order Kit (₹6,000)
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
