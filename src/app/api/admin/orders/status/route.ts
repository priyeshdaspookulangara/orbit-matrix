import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import db from '@/lib/db';

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const body = await req.json();
    const { orderId, fulfillmentStatus, trackingNumber } = body;

    if (!orderId || !fulfillmentStatus) {
      return NextResponse.json({ error: 'orderId and fulfillmentStatus are required.' }, { status: 400 });
    }

    if (!['Processing', 'Dispatched', 'Delivered'].includes(fulfillmentStatus)) {
      return NextResponse.json({ error: 'Invalid fulfillment status.' }, { status: 400 });
    }

    db.prepare(`
      UPDATE orders
      SET fulfillment_status = ?, tracking_number = ?
      WHERE id = ?
    `).run(fulfillmentStatus, trackingNumber || null, orderId);

    return NextResponse.json({ success: true, message: 'Order fulfillment status updated.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
