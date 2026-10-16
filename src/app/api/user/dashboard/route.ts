import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = db.prepare(`
      SELECT id, name, email, role, sponsor_id, parent_id, level, children_count, wallet_balance, created_at
      FROM users WHERE id = ?
    `).get(session.userId) as any;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get order details
    const order = db.prepare(`
      SELECT id, package_name, amount, flavor, shipping_address, fulfillment_status, tracking_number, created_at
      FROM orders WHERE user_id = ?
      ORDER BY created_at DESC LIMIT 1
    `).get(user.id) as any;

    // Get recent transactions
    const transactions = db.prepare(`
      SELECT id, amount, type, description, from_user_id, created_at
      FROM transactions WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(user.id) as any[];

    // Get direct referrals list
    const referrals = db.prepare(`
      SELECT id, name, email, level, created_at
      FROM users WHERE sponsor_id = ?
      ORDER BY created_at DESC
    `).all(user.id) as any[];

    // Get direct matrix children list
    const children = db.prepare(`
      SELECT id, name, email, level, created_at
      FROM users WHERE parent_id = ?
      ORDER BY created_at ASC
    `).all(user.id) as any[];

    // Get tree node hierarchy (up to 3 levels down for matrix viewer)
    const getSubtree = (nodeId: string, currentDepth: number, maxDepth: number): any => {
      const node = db.prepare(`SELECT id, name, level, children_count, sponsor_id FROM users WHERE id = ?`).get(nodeId) as any;
      if (!node || currentDepth >= maxDepth) return node;

      const kids = db.prepare(`SELECT id FROM users WHERE parent_id = ? ORDER BY rowid ASC`).all(nodeId) as any[];
      node.children = kids.map((k: any) => getSubtree(k.id, currentDepth + 1, maxDepth));
      return node;
    };

    const tree = getSubtree(user.id, 0, 3);

    return NextResponse.json({
      user,
      order: order || null,
      transactions,
      referrals,
      children,
      tree
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
