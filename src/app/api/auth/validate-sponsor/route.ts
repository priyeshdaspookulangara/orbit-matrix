import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sponsorId = searchParams.get('id')?.trim().toUpperCase();

    if (!sponsorId) {
      return NextResponse.json({ valid: false, error: 'Sponsor ID is required' }, { status: 400 });
    }

    const sponsor = db.prepare(`
      SELECT id, name, role FROM users WHERE id = ?
    `).get(sponsorId) as { id: string; name: string; role: string } | undefined;

    if (!sponsor) {
      return NextResponse.json({
        valid: false,
        error: `No sponsor found with ID "${sponsorId}". Please double-check the ID.`
      });
    }

    return NextResponse.json({
      valid: true,
      sponsor: {
        id: sponsor.id,
        name: sponsor.name,
        role: sponsor.role
      }
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err.message }, { status: 500 });
  }
}
