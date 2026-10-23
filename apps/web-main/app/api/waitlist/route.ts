import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getResend } from '@/lib/resend';
import { readSubmission, submitToNeon, SubmissionError } from '@/lib/neon';

export const runtime = 'nodejs';

const schema = z.object({
  email: z.string().trim().max(254).email().transform((email) => email.toLowerCase()),
  interests: z.array(z.enum(['pay', 'creators', 'card', 'wallet', 'banking', 'finans'])).max(6).optional(),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await readSubmission(req);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request body' },
      { status: error instanceof SubmissionError ? error.status : 400 });
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email, interests } = result.data;

  try {
    const saved = await submitToNeon('waitlist', { email, interests });
    if (!saved.ok) {
      const status = [400, 409, 413, 429].includes(saved.status) ? saved.status : 503;
      return NextResponse.json({ error: status === 429 ? 'Too many requests. Please try again later.' : 'Unable to save signup. Please try again.' },
        { status, headers: status === 429 ? { 'Retry-After': saved.headers.get('retry-after') || '3600' } : {} });
    }

    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      try {
        const response = await getResend().contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID,
          firstName: interests?.join(', ') || undefined });
        if (response.error) console.error('Waitlist email sync failed:', response.error.name);
      } catch { console.error('Waitlist email sync failed; signup is saved in Postgres'); }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unable to save signup. Please try again.' }, { status: 503 });
  }
}
