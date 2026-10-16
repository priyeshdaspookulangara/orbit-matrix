import { NextRequest, NextResponse } from 'next/server';
import { registerDistributor } from '@/lib/matrix';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, sponsorId, flavor, shippingAddress } = body;

    if (!name || !email || !password || !sponsorId || !flavor || !shippingAddress) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!['Chocolate', 'Vanilla'].includes(flavor)) {
      return NextResponse.json({ error: 'Invalid flavor choice.' }, { status: 400 });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const result = await registerDistributor({
      name,
      email: email.trim().toLowerCase(),
      passwordHash,
      sponsorId: sponsorId.trim().toUpperCase(),
      flavor,
      shippingAddress
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Package order created.',
      data: result
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 400 });
  }
}
