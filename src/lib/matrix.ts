import db from './db';
import { Mutex } from 'async-mutex';
import crypto from 'crypto';

const matrixMutex = new Mutex();

export interface RegisterInput {
  name: string;
  email: string;
  passwordHash: string;
  sponsorId: string;
  flavor: 'Chocolate' | 'Vanilla';
  shippingAddress: string;
}

/**
 * Generates the next sequential ID formatted like ORB00001, ORB00002...
 */
function generateNextMemberId(): string {
  const row = db.prepare(`SELECT id FROM users WHERE id LIKE 'ORB%' ORDER BY rowid DESC LIMIT 1`).get() as { id: string } | undefined;
  if (!row || !row.id || row.id === 'ORB00000') {
    // If only root or none exist
    const countRow = db.prepare(`SELECT COUNT(*) as count FROM users`).get() as { count: number };
    const nextNum = countRow.count;
    return `ORB${String(nextNum).padStart(5, '0')}`;
  }

  const numericPart = parseInt(row.id.replace('ORB', ''), 10);
  const nextNum = numericPart + 1;
  return `ORB${String(nextNum).padStart(5, '0')}`;
}

/**
 * Strict Company-Wide Breadth-First Search (BFS) Spillover Placement
 * Level-by-level, left-to-right across every parent node.
 * Finds the first node with level < 4 and children_count < 10.
 */
export function findNextBfsParent(): { parentId: string; parentLevel: number } {
  // Breadth-First Search using SQL queue traversal or memory queue of current nodes
  // Max levels: Level 0 (Root) up to Level 4 (since depth is 5 levels total: L0, L1, L2, L3, L4).
  // A node at level 4 cannot have children because level 4 children would be level 5 (exceeding 5-level max depth).

  // Queue initialized with Root node 'ORB00000'
  const queue: string[] = ['ORB00000'];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const node = db.prepare(`SELECT id, level, children_count FROM users WHERE id = ?`).get(currentId) as {
      id: string;
      level: number;
      children_count: number;
    } | undefined;

    if (!node) continue;

    // Check if this node can take a child (must be level < 4 and children_count < 10)
    if (node.level < 4 && node.children_count < 10) {
      return { parentId: node.id, parentLevel: node.level };
    }

    // If node is full or cannot take children, fetch its children in order of join/insertion (left-to-right)
    const children = db.prepare(`SELECT id FROM users WHERE parent_id = ? ORDER BY rowid ASC`).all(currentId) as { id: string }[];
    for (const child of children) {
      queue.push(child.id);
    }
  }

  throw new Error('Matrix is at full global capacity (11,111 nodes).');
}

/**
 * Registers a new distributor, assigns parent via BFS spillover, creates package order, and distributes commissions.
 * Thread-safe using Mutex lock.
 */
export async function registerDistributor(input: RegisterInput) {
  return await matrixMutex.runExclusive(async () => {
    // 1. Verify sponsor exists
    const sponsor = db.prepare(`SELECT id FROM users WHERE id = ?`).get(input.sponsorId) as { id: string } | undefined;
    if (!sponsor) {
      throw new Error(`Invalid Sponsor ID: ${input.sponsorId}`);
    }

    // Check email uniqueness
    const existingEmail = db.prepare(`SELECT id FROM users WHERE email = ?`).get(input.email);
    if (existingEmail) {
      throw new Error('Email address is already registered.');
    }

    // 2. Find parent via BFS
    const { parentId, parentLevel } = findNextBfsParent();
    const newMemberId = generateNextMemberId();
    const newMemberLevel = parentLevel + 1;

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // SQLite transaction for atomic registration & commission distribution
    const registerTx = db.transaction(() => {
      // Insert new user
      db.prepare(`
        INSERT INTO users (id, name, email, password_hash, role, sponsor_id, parent_id, level, children_count, wallet_balance)
        VALUES (?, ?, ?, ?, 'member', ?, ?, ?, 0, 0)
      `).run(
        newMemberId,
        input.name,
        input.email,
        input.passwordHash,
        input.sponsorId,
        parentId,
        newMemberLevel
      );

      // Increment parent children_count
      db.prepare(`UPDATE users SET children_count = children_count + 1 WHERE id = ?`).run(parentId);

      // Create Package Order (₹6,000)
      db.prepare(`
        INSERT INTO orders (id, user_id, package_name, amount, flavor, shipping_address, fulfillment_status)
        VALUES (?, ?, '1kg Pure Protein Powder Tub Kit', 6000, ?, ?, 'Processing')
      `).run(orderId, newMemberId, input.flavor, input.shippingAddress);

      // Record Package Purchase Transaction
      db.prepare(`
        INSERT INTO transactions (id, user_id, amount, type, description, from_user_id)
        VALUES (?, ?, ?, 'PACKAGE_PURCHASE', ?, ?)
      `).run(
        `TX-${crypto.randomUUID().slice(0, 8)}`,
        newMemberId,
        -6000,
        `Purchased ₹6,000 Protein Powder Kit (${input.flavor})`,
        newMemberId
      );

      // --- FINANCIAL COMMISSIONS ---
      // 1. Direct Referral Commission: ₹1,000 credited to sponsor
      db.prepare(`UPDATE users SET wallet_balance = wallet_balance + 1000 WHERE id = ?`).run(input.sponsorId);
      db.prepare(`
        INSERT INTO transactions (id, user_id, amount, type, description, from_user_id)
        VALUES (?, ?, 1000, 'DIRECT_REFERRAL', ?, ?)
      `).run(
        `TX-${crypto.randomUUID().slice(0, 8)}`,
        input.sponsorId,
        `Direct Sponsor Bonus for registering member ${newMemberId}`,
        newMemberId
      );

      // 2. Matrix Level Commission: ₹200 distributed automatically up the upline parent chain
      let currParentId: string | null = parentId;
      let depth = 1;

      while (currParentId && depth <= 5) {
        // Credit ₹200 to upline parent
        db.prepare(`UPDATE users SET wallet_balance = wallet_balance + 200 WHERE id = ?`).run(currParentId);
        db.prepare(`
          INSERT INTO transactions (id, user_id, amount, type, description, from_user_id)
          VALUES (?, ?, 200, 'MATRIX_LEVEL', ?, ?)
        `).run(
          `TX-${crypto.randomUUID().slice(0, 8)}`,
          currParentId,
          `Matrix Level ${depth} Commission from node ${newMemberId}`,
          newMemberId
        );

        // Fetch parent's parent
        const parentUser = db.prepare(`SELECT parent_id FROM users WHERE id = ?`).get(currParentId) as { parent_id: string | null } | undefined;
        currParentId = parentUser?.parent_id || null;
        depth++;
      }
    });

    registerTx();

    return {
      userId: newMemberId,
      parentId,
      level: newMemberLevel,
      sponsorId: input.sponsorId,
      orderId
    };
  });
}
