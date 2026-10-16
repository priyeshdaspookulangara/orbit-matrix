import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Dumbbell, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Brand Story & Mission
          </span>
          <h1 className="text-4xl font-black text-white mt-4">
            Pioneering Pure Nutrition & Financial Growth
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            ORBMATRIX was founded in 2026 to bridge high-grade dietary supplements with transparent, automated network commission models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">100% Ultra-Filtered Pure Whey</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every 1kg tub produced by ORBMATRIX undergoes rigorous micro-filtration to eliminate excess fats and sugars while delivering 26g of pure bioavailable protein per scoop.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Algorithmic Company-Wide Spillover</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We eliminated manual placement bias. Our system runs a company-wide Breadth-First Search (BFS) engine that auto-places new members systematically into empty positions across all 5 levels.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">Our Quality Guarantee</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            All ORBMATRIX protein products are manufactured in ISO & GMP-certified state-of-the-art facilities in India. Batches are third-party lab-tested for heavy metals and label accuracy, ensuring every distributor and consumer receives authentic, premium nutrition.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
