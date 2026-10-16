import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Network, Gift, Layers, CheckCircle } from 'lucide-react';

export default function BusinessPlanPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Compensation Structure
          </span>
          <h1 className="text-4xl font-black text-white mt-4">
            10-Matrix 5-Level Business Compensation Plan
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            Transparent, predictable, and automated financial growth powered by ₹6,000 distributor kits.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">₹6,000 Activation Kit</h3>
            <p className="text-xs text-slate-400 mt-2">
              Includes 1kg Protein Powder Tub (Chocolate/Vanilla) + Business Activation + Dispatch Tracking.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">₹1,000 Direct Referral</h3>
            <p className="text-xs text-slate-400 mt-2">
              Credited instantly to the sponsor's wallet for every direct distributor sign-up.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">₹200 Matrix Commission</h3>
            <p className="text-xs text-slate-400 mt-2">
              Paid automatically up 5 levels for every placed member in your matrix structure.
            </p>
          </div>
        </div>

        {/* Level breakdown table */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Global Matrix Capacity & Commission Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-cyan-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Matrix Capacity</th>
                  <th className="py-3 px-4">Commission per Head</th>
                  <th className="py-3 px-4 text-right">Level Earnings Potential</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Level 0</td>
                  <td className="py-3 px-4">1 (Root)</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">-</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Level 1</td>
                  <td className="py-3 px-4">10 Members</td>
                  <td className="py-3 px-4">₹200</td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">₹2,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Level 2</td>
                  <td className="py-3 px-4">100 Members</td>
                  <td className="py-3 px-4">₹200</td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">₹20,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Level 3</td>
                  <td className="py-3 px-4">1,000 Members</td>
                  <td className="py-3 px-4">₹200</td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">₹200,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Level 4</td>
                  <td className="py-3 px-4">10,000 Members</td>
                  <td className="py-3 px-4">₹200</td>
                  <td className="py-3 px-4 text-right font-mono text-cyan-400">₹2,000,000</td>
                </tr>
                <tr className="bg-cyan-950/30 font-bold text-white">
                  <td className="py-4 px-4 text-cyan-400" colSpan={2}>Total Platform Depth (5 Tiers Max: 11,111 Nodes)</td>
                  <td className="py-4 px-4 text-cyan-400">Max Matrix Bonus:</td>
                  <td className="py-4 px-4 text-right font-mono text-cyan-300 text-sm">₹2,222,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BFS Spillover Explanation */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-3">How BFS Auto-Spillover Works</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            If you sponsor more than 10 distributors, your 11th referral cannot fit directly under your node. Instead of placing them manually or randomly, our company-wide Breadth-First Search (BFS) engine fills positions level-by-level, left-to-right.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" /> You still earn the ₹1,000 Direct Referral Bonus.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" /> Your downline gets a new child node automatically (Spillover support).
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" /> You and up to 4 uplines each receive ₹200 level commission.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
