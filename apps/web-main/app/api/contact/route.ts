import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getResend } from '@/lib/resend';
import { randomUUID } from 'node:crypto';
import { readSubmission, submitToNeon, SubmissionError } from '@/lib/neon';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().max(254).email().transform((email) => email.toLowerCase()),
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(10).max(10000),
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
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;
  const requestId = req.headers.get('idempotency-key') || randomUUID();
  if (!z.string().uuid().safeParse(requestId).success) {
    return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
  }

  try {
    const saved = await submitToNeon('contact', result.data, requestId);
    if (!saved.ok) {
      const status = [400, 409, 413, 429].includes(saved.status) ? saved.status : 503;
      return NextResponse.json({ error: status === 429 ? 'Too many requests. Please try again later.' : 'Unable to save message. Please try again.' },
        { status, headers: status === 429 ? { 'Retry-After': saved.headers.get('retry-after') || '3600' } : {} });
    }
    const receipt = await saved.json();

    if (process.env.RESEND_API_KEY && receipt.notify) {
      try {
        const response = await getResend().emails.send({
          from: process.env.CONTACT_FROM_EMAIL || 'mavi finans <noreply@mavifinans.eu>',
          to: process.env.CONTACT_TO_EMAIL || 'hello@mavifinans.eu', replyTo: email,
          subject: `[Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        });
        if (response.error) console.error('Contact notification failed:', response.error.name);
      } catch { console.error('Contact notification failed; message is saved in Postgres and Object Storage'); }
    }

    return NextResponse.json({ success: true, id: receipt.id });
  } catch {
    return NextResponse.json({ error: 'Unable to save message. Please try again.' }, { status: 503 });
  }
}
