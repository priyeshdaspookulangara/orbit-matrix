import db, { initDb } from '../src/lib/db';
import { registerDistributor } from '../src/lib/matrix';
import bcrypt from 'bcryptjs';

async function runComprehensiveTests() {
  console.log('--- RUNNING COMPREHENSIVE PLATFORM MATRIX TESTS ---');

  // Re-init DB
  initDb();

  const passHash = bcrypt.hashSync('testpass123', 10);

  // Test 1: Verify Root Admin existence
  const root = db.prepare(`SELECT * FROM users WHERE id = 'ORB00000'`).get() as any;
  if (!root || root.role !== 'admin') {
    throw new Error('Test 1 Failed: Root Admin ORB00000 missing');
  }
  console.log('✓ Test 1 Passed: Root Admin initialized.');

  // Test 2: Register 10 direct children under Root
  // Every new node should get parent ORB00000 and Level 1
  for (let i = 1; i <= 10; i++) {
    const res = await registerDistributor({
      name: `Distributor ${i}`,
      email: `distributor${i}@test.com`,
      passwordHash: passHash,
      sponsorId: 'ORB00000',
      flavor: i % 2 === 0 ? 'Chocolate' : 'Vanilla',
      shippingAddress: `Address Line ${i}`
    });

    if (res.parentId !== 'ORB00000' || res.level !== 1) {
      throw new Error(`Test 2 Failed for member ${res.userId}: Parent ${res.parentId}, Level ${res.level}`);
    }
  }
  console.log('✓ Test 2 Passed: 10 members filled Level 1 under ORB00000.');

  // Test 3: Spillover Verification (11th Member)
  // 11th member must spill over to the first child of Root (ORB00001) and get Level 2
  const spill11 = await registerDistributor({
    name: 'Spillover Member 11',
    email: 'distributor11@test.com',
    passwordHash: passHash,
    sponsorId: 'ORB00000',
    flavor: 'Chocolate',
    shippingAddress: 'Address Line 11'
  });

  if (spill11.parentId !== 'ORB00001' || spill11.level !== 2) {
    throw new Error(`Test 3 Failed: Member 11 expected Parent ORB00001, got ${spill11.parentId}`);
  }
  console.log('✓ Test 3 Passed: 11th member successfully spilled over to ORB00001 at Level 2.');

  // Test 4: Financial Commissions Accounting
  // Sponsor (ORB00000) referred 11 members: 11 * ₹1,000 = ₹11,000
  // Matrix Level 1 bonus (10 members under root) = 10 * ₹200 = ₹2,000
  // Matrix Level 2 bonus (11th member under ORB00001, which is L2 for root) = 1 * ₹200 = ₹200
  // Total expected Root wallet balance = 11,000 + 2,000 + 200 = ₹13,200
  const rootUpdated = db.prepare(`SELECT wallet_balance FROM users WHERE id = 'ORB00000'`).get() as any;
  if (rootUpdated.wallet_balance !== 13200) {
    throw new Error(`Test 4 Failed: Expected Root Balance 13200, got ${rootUpdated.wallet_balance}`);
  }
  console.log('✓ Test 4 Passed: Wallet commission calculations verified (Root Balance: ₹13,200).');

  // Test 5: Upline chain level payout for ORB00001
  // Member 11 placed under ORB00001 -> ORB00001 gets Level 1 matrix bonus = ₹200
  const orb1 = db.prepare(`SELECT wallet_balance FROM users WHERE id = 'ORB00001'`).get() as any;
  if (orb1.wallet_balance !== 200) {
    throw new Error(`Test 5 Failed: Expected ORB00001 Balance 200, got ${orb1.wallet_balance}`);
  }
  console.log('✓ Test 5 Passed: Upline parent ORB00001 credited with ₹200 level commission.');

  console.log('--- ALL AUTOMATED TESTS COMPLETED SUCCESSFULLY ---');
}

runComprehensiveTests().catch((err) => {
  console.error('TESTING ERROR:', err);
  process.exit(1);
});
