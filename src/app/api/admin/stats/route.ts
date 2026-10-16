import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim() || '';

    // Total Users
    const totalMembersRow = db.prepare(`SELECT COUNT(*) as count FROM users WHERE id != 'ORB00000'`).get() as any;
    const totalMembers = totalMembersRow.count;

    // Total Revenue (₹6000 per order)
    const totalOrdersRow = db.prepare(`SELECT COUNT(*) as count, SUM(amount) as total_rev FROM orders`).get() as any;
    const totalRevenue = totalOrdersRow.total_rev || 0;

    // Total Commissions Paid Out
    const totalCommissionsRow = db.prepare(`
      SELECT SUM(amount) as total_comm FROM transactions WHERE type IN ('DIRECT_REFERRAL', 'MATRIX_LEVEL')
    `).get() as any;
    const totalCommissions = totalCommissionsRow.total_comm || 0;

    // Active orders status count
    const processingOrders = (db.prepare(`SELECT COUNT(*) as c FROM orders WHERE fulfillment_status = 'Processing'`).get() as any).c;
    const dispatchedOrders = (db.prepare(`SELECT COUNT(*) as c FROM orders WHERE fulfillment_status = 'Dispatched'`).get() as any).c;
    const deliveredOrders = (db.prepare(`SELECT COUNT(*) as c FROM orders WHERE fulfillment_status = 'Delivered'`).get() as any).c;

    // Member Listings with safe SQL parameterized search filter
    let membersQuery = `
      SELECT u.id, u.name, u.email, u.role, u.sponsor_id, u.parent_id, u.level, u.children_count, u.wallet_balance, u.created_at,
             o.id as order_id, o.flavor, o.shipping_address, o.fulfillment_status, o.tracking_number
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
    `;

    let members: any[];
    if (search) {
      membersQuery += ` WHERE u.id LIKE ? OR u.name LIKE ? OR u.email LIKE ? OR u.sponsor_id LIKE ? ORDER BY u.created_at DESC`;
      const searchPattern = `%${search}%`;
      members = db.prepare(membersQuery).all(searchPattern, searchPattern, searchPattern, searchPattern);
    } else {
      membersQuery += ` ORDER BY u.created_at DESC`;
      members = db.prepare(membersQuery).all();
    }

    // Full Matrix Structure overview from Root
    const getFullTree = (nodeId: string, depth: number): any => {
      const node = db.prepare(`SELECT id, name, level, children_count, sponsor_id, parent_id FROM users WHERE id = ?`).get(nodeId) as any;
      if (!node || depth >= 4) return node;

      const kids = db.prepare(`SELECT id FROM users WHERE parent_id = ? ORDER BY rowid ASC`).all(nodeId) as any[];
      node.children = kids.map((k: any) => getFullTree(k.id, depth + 1));
      return node;
    };

    const rootTree = getFullTree('ORB00000', 0);

    return NextResponse.json({
      stats: {
        totalMembers,
        totalRevenue,
        totalCommissions,
        processingOrders,
        dispatchedOrders,
        deliveredOrders
      },
      members,
      rootTree
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
