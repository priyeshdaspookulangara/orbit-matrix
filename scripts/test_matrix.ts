import db, { initDb } from '../src/lib/db';
import { registerDistributor } from '../src/lib/matrix';
import bcrypt from 'bcryptjs';

async function testMatrix() {
  console.log('--- Testing Matrix & Commissions ---');
  initDb();

  const passwordHash = bcrypt.hashSync('pass123', 10);

  // Register 12 users under sponsor ORB00000
  for (let i = 1; i <= 12; i++) {
    const res = await registerDistributor({
      name: `User ${i}`,
      email: `user${i}@test.com`,
      passwordHash,
      sponsorId: 'ORB00000',
      flavor: i % 2 === 0 ? 'Chocolate' : 'Vanilla',
      shippingAddress: `Address ${i}`
    });
    console.log(`Registered ${res.userId} -> Parent: ${res.parentId}, Level: ${res.level}`);
  }

  const root = db.prepare('SELECT wallet_balance, children_count FROM users WHERE id = ?').get('ORB00000') as any;
  console.log('Root Wallet Balance:', root.wallet_balance);
  console.log('Root Direct Children:', root.children_count);

  const orb1 = db.prepare('SELECT wallet_balance, children_count FROM users WHERE id = ?').get('ORB00001') as any;
  console.log('ORB00001 Wallet Balance:', orb1.wallet_balance);
  console.log('ORB00001 Direct Children:', orb1.children_count);

  console.log('--- Test Complete ---');
}

testMatrix().catch(console.error);
