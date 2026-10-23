import 'server-only';

export class SubmissionError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function readSubmission(request: Request): Promise<unknown> {
  const limit = 32768;
  if (Number(request.headers.get('content-length')) > limit) throw new SubmissionError('Request too large', 413);
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError('Invalid request body', 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new SubmissionError('Request too large', 413);
      }
      chunks.push(value);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new SubmissionError('Invalid request body', 400); }
  } finally { reader.releaseLock(); }
}

export async function submitToNeon(path: 'waitlist' | 'contact', data: unknown, requestId?: string): Promise<Response> {
  const url = process.env.NEON_FUNCTION_WEBSITE_BASE_URL;
  const secret = process.env.MAVI_ORIGIN_SECRET;
  if (!url || !secret) throw new SubmissionError('Submission service unavailable', 503);
  const headers = new Headers({ 'content-type': 'application/json', 'x-secret': secret });
  if (requestId) headers.set('idempotency-key', requestId);
  try {
    return await fetch(new URL(path, url.endsWith('/') ? url : `${url}/`), {
      method: 'POST', headers, body: JSON.stringify(data),
      redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(25000),
    });
  } catch { throw new SubmissionError('Submission service unavailable. Please try again.', 503); }
}
