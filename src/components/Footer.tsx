import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950/80 border-t border-slate-800/80 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
              O
            </div>
            <span className="text-lg font-bold text-white tracking-wide">ORBMATRIX</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Next-generation 10-Matrix direct selling protein brand. Automated company-wide BFS spillover placement engine engineered for transparency and max growth.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400">About Brand</Link></li>
            <li><Link href="/business-plan" className="hover:text-cyan-400">10-Matrix Business Plan</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400">Contact & Fulfillment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Distributor Kit</h4>
          <p className="text-xs text-slate-400 mb-2">₹6,000 Package includes:</p>
          <ul className="text-xs space-y-1 list-disc list-inside text-slate-400">
            <li>1kg Pure Whey Protein Tub</li>
            <li>₹1,000 Direct Referral Bonus</li>
            <li>₹200 Matrix Level Commissions</li>
            <li>Instant Dispatch Tracking</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Corporate Details</h4>
          <p className="text-xs text-slate-400">Root Node: <span className="font-mono text-cyan-400">ORB00000</span></p>
          <p className="text-xs text-slate-400 mt-1">Platform Currency: INR (₹)</p>
          <p className="text-xs text-slate-400 mt-1">Strict 5-Level Matrix Depth Limit</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
        <p>© 2026 ORBMATRIX Direct Selling Platform. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 font-mono text-[11px] text-cyan-400/80">BFS Spillover Engine Enabled</p>
      </div>
    </footer>
  );
}
