import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'matrix_platform.db');
const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Initialize database schema
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member', -- 'admin' or 'member'
      sponsor_id TEXT,
      parent_id TEXT,
      level INTEGER NOT NULL,
      children_count INTEGER NOT NULL DEFAULT 0,
      wallet_balance REAL NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sponsor_id) REFERENCES users(id),
      FOREIGN KEY (parent_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      package_name TEXT NOT NULL DEFAULT '1kg Pure Protein Powder Tub Kit',
      amount REAL NOT NULL DEFAULT 6000,
      flavor TEXT NOT NULL, -- 'Chocolate' or 'Vanilla'
      shipping_address TEXT NOT NULL,
      fulfillment_status TEXT NOT NULL DEFAULT 'Processing', -- 'Processing', 'Dispatched', 'Delivered'
      tracking_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL, -- 'DIRECT_REFERRAL', 'MATRIX_LEVEL', 'PACKAGE_PURCHASE'
      description TEXT NOT NULL,
      from_user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // Seed Root Node ORB00000 if not present safely
  const rootUser = db.prepare(`SELECT * FROM users WHERE id = ? OR email = ?`).get('ORB00000', 'admin@orb.com');
  if (!rootUser) {
    const bcrypt = require('bcryptjs');
    const rootPasswordHash = bcrypt.hashSync('admin123', 10);

    db.prepare(`
      INSERT OR IGNORE INTO users (id, name, email, password_hash, role, sponsor_id, parent_id, level, children_count, wallet_balance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'ORB00000',
      'System Root Admin',
      'admin@orb.com',
      rootPasswordHash,
      'admin',
      null,
      null,
      0, // Root is Level 0
      0,
      0
    );
  }
}

// Auto init on import
initDb();

export default db;
