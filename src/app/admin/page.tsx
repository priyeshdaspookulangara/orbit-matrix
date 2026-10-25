'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  DollarSign, Users, Package, Award, Search, RefreshCw, CheckCircle, Truck, Clock, Shield, Network, Menu, X
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [statusForm, setStatusForm] = useState({ fulfillmentStatus: 'Processing', trackingNumber: '' });
  const [savingStatus, setSavingStatus] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchStats = (searchQuery = '') => {
    setLoading(true);
    fetch(`/api/admin/stats?search=${encodeURIComponent(searchQuery)}`)
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 403 || res.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error('Failed to load admin stats');
        }
        return res.json();
      })
      .then((resData) => {
        if (resData) setData(resData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(search);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setSavingStatus(true);

    try {
      const res = await fetch('/api/admin/orders/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: editingOrder.order_id,
          fulfillmentStatus: statusForm.fulfillmentStatus,
          trackingNumber: statusForm.trackingNumber
        })
      });

      if (!res.ok) throw new Error('Failed to update status');

      setEditingOrder(null);
      fetchStats(search);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingStatus(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center max-w-md">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <a href="/login" className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg text-sm font-bold">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const { stats, members, rootTree } = data || {};

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans">

      {/* Desktop Left Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar stats={stats} />
      </div>

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header Bar */}
        <header className="h-16 glass-card border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-400 hover:text-white lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              Company Control HQ & Master Management
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchStats(search)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Refresh
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex">
            <div className="relative">
              <AdminSidebar stats={stats} />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-4 text-white hover:text-cyan-400 ml-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Body Content */}
        <main className="p-6 lg:p-8 space-y-8 flex-1 max-w-7xl">

          {/* Global Financial Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Total Platform Revenue</span>
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-400 mt-2">₹6,000 per distributor kit</div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Total Commissions Paid</span>
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-cyan-400 font-mono">
                ₹{(stats?.totalCommissions || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-400 mt-2">Referrals + Level Bonuses</div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Registered Distributors</span>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-white">{stats?.totalMembers || 0}</div>
              <div className="text-xs text-cyan-400 mt-2 font-mono">Max Capacity: 11,111 Nodes</div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Package Fulfillment</span>
                <Package className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-sm font-semibold text-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-amber-400">Processing:</span>
                  <span>{stats?.processingOrders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400">Dispatched:</span>
                  <span>{stats?.dispatchedOrders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">Delivered:</span>
                  <span>{stats?.deliveredOrders || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Member Directory & Search */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Distributor Master Directory</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Searchable list of all registered members, placement levels, sponsors, and order statuses.
                </p>
              </div>

              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search ID, Name, Email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 w-64"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-300 transition-colors"
                >
                  Filter
                </button>
              </form>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-cyan-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Member ID</th>
                    <th className="py-3.5 px-4">Name / Email</th>
                    <th className="py-3.5 px-4">Level</th>
                    <th className="py-3.5 px-4">Parent ID</th>
                    <th className="py-3.5 px-4">Sponsor ID</th>
                    <th className="py-3.5 px-4">Flavor</th>
                    <th className="py-3.5 px-4">Fulfillment Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {members && members.length > 0 ? (
                    members.map((m: any) => (
                      <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{m.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{m.name}</div>
                          <div className="text-[11px] text-slate-400">{m.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 font-bold text-cyan-300">
                            L{m.level}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">{m.parent_id || 'Root'}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">{m.sponsor_id || 'None'}</td>
                        <td className="py-3.5 px-4 font-medium text-amber-300">{m.flavor || 'N/A'}</td>
                        <td className="py-3.5 px-4">
                          {m.fulfillment_status ? (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              m.fulfillment_status === 'Delivered'
                                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400'
                                : m.fulfillment_status === 'Dispatched'
                                ? 'bg-cyan-950 border-cyan-500/40 text-cyan-400'
                                : 'bg-amber-950 border-amber-500/40 text-amber-400'
                            }`}>
                              {m.fulfillment_status}
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {m.order_id && (
                            <button
                              onClick={() => {
                                setEditingOrder(m);
                                setStatusForm({
                                  fulfillmentStatus: m.fulfillment_status || 'Processing',
                                  trackingNumber: m.tracking_number || ''
                                });
                              }}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-[11px] font-semibold transition-colors"
                            >
                              Edit Status
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No distributors found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Global Root Matrix Explorer */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Global Matrix Tree Visualizer (Root ORB00000)</h3>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
              {rootTree ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-cyan-950/80 border border-cyan-500/40 rounded-xl w-fit">
                    <span className="font-mono text-cyan-400 font-bold">{rootTree.id}</span>
                    <span className="text-xs text-white font-bold">{rootTree.name}</span>
                    <span className="text-[10px] bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                      ROOT (L0) - {rootTree.children_count}/10 Children
                    </span>
                  </div>

                  {rootTree.children && rootTree.children.length > 0 && (
                    <div className="pl-6 border-l-2 border-cyan-500/30 space-y-3">
                      {rootTree.children.map((child: any) => (
                        <div key={child.id} className="space-y-2">
                          <div className="flex items-center gap-3 p-2.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
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
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Tree loading...</p>
              )}
            </div>
          </div>

        </main>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 rounded-3xl border border-cyan-500/40 max-w-md w-full space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Update Dispatch Status</h3>
              <p className="text-xs text-slate-400 mt-1">
                For Order: <span className="font-mono text-cyan-400">{editingOrder.order_id}</span> ({editingOrder.name})
              </p>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Fulfillment Status
                </label>
                <select
                  value={statusForm.fulfillmentStatus}
                  onChange={(e) => setStatusForm({ ...statusForm, fulfillmentStatus: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Courier Tracking Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. AWB-99882211"
                  value={statusForm.trackingNumber}
                  onChange={(e) => setStatusForm({ ...statusForm, trackingNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 font-semibold rounded-xl text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStatus}
                  className="flex-1 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-cyan-500/20"
                >
                  {savingStatus ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
