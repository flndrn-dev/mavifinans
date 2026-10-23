import { z } from 'zod';

const email = z.string().trim().max(254).email().transform((value) => value.toLowerCase());
const interest = z.enum(['pay', 'creators', 'card', 'wallet', 'banking', 'finans'])
  .transform((value) => value === 'finans' ? 'banking' : value);
export const waitlistSchema = z.object({
  email,
  interests: z.array(interest).max(6).default([]).transform((values) => [...new Set(values)]),
});
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email,
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(10).max(10000),
});
export const requestIdSchema = z.string().uuid();

export class BodyError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export async function readJson(request) {
  const limit = 32768;
  if (Number(request.headers.get('content-length')) > limit) throw new BodyError('Request too large', 413);
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError('Invalid request body', 400);
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new BodyError('Request too large', 413);
      }
      chunks.push(value);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new BodyError('Invalid request body', 400); }
  } finally { reader.releaseLock(); }
}
