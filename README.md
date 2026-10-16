# ORBMATRIX - Modern Direct Selling Platform (10-Matrix BFS Auto-Spillover)

ORBMATRIX is a production-grade, 2026 dark glassmorphic web application designed for a direct selling protein powder brand featuring a strict company-wide **Breadth-First Search (BFS) forced auto-spillover engine** in a 10-matrix 5-level structure.

## Features & Highlights

- **2026 Dark Glassmorphic Design:** `#0b0f19` dark navy background, glassmorphism cards, neon cyan `#06b6d4` highlights, responsive navigation, and micro-interactions.
- **Strict Company-Wide BFS Engine:** Level-by-level, left-to-right queue placement across all nodes. Each parent has max 10 direct children. Matrix capped strictly at 5 levels depth (Root + 4 tiers; global capacity = 11,111 nodes).
- **Concurrency Locks:** Thread-safe matrix node placement using `async-mutex` to prevent race conditions during simultaneous registrations.
- **₹6,000 Product Package Model:** Every registration creates an order for a 1kg Pure Protein Tub Kit (Chocolate/Vanilla) with shipping fulfillment tracking.
- **Automated Commission Engine:**
  - ₹1,000 direct referral credited instantly to the direct sponsor's wallet.
  - ₹200 level commission credited automatically up the 5-level upline parent chain.
- **Member Portal:** View personal stats, matrix placement tier, parent node ID, direct referrals, wallet ledger, package fulfillment stepper, and interactive downline subtree explorer.
- **Admin Section:** Company-wide financial revenue metrics, searchable distributor master directory, order fulfillment status editor (Processing / Dispatched / Delivered), and visual root matrix tree inspector.

## Default Admin Credentials
- **Identifier:** `ORB00000` or `admin@orb.com`
- **Password:** `admin123`

## Running Locally

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```
