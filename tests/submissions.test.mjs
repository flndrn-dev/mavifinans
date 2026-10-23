import { test } from 'node:test';
import assert from 'node:assert/strict';
import { waitlistSchema, contactSchema, readJson } from '../functions/validation.mjs';

test('normalizes email, preserves product choices and resolves the legacy finans alias', () => {
  assert.deepEqual(waitlistSchema.parse({ email: '  Person@Example.com ', interests: ['finans', 'banking', 'pay'] }),
    { email: 'person@example.com', interests: ['banking', 'pay'] });
  assert.deepEqual(waitlistSchema.parse({ email: 'person@example.com' }).interests, []);
  assert.equal(waitlistSchema.safeParse({ email: 'person@example.com', interests: ['unknown'] }).success, false);
});

test('rejects blank, invalid and excessively long contact data', () => {
  const valid = { name: 'Person', email: 'person@example.com', subject: 'Question', message: 'A website question.' };
  assert.equal(contactSchema.safeParse(valid).success, true);
  for (const invalid of [{ name: ' ' }, { email: 'invalid' }, { message: 'short' }, { message: 'x'.repeat(10001) }, { subject: 'x'.repeat(301) }]) {
    assert.equal(contactSchema.safeParse({ ...valid, ...invalid }).success, false);
  }
});

test('rejects invalid JSON and oversized streams without trusting content-length', async () => {
  await assert.rejects(readJson(new Request('https://example.com', { method: 'POST', body: '{' })), { status: 400 });
  await assert.rejects(readJson(new Request('https://example.com', { method: 'POST', body: 'x'.repeat(32769) })), { status: 413 });
  assert.deepEqual(await readJson(new Request('https://example.com', { method: 'POST', body: '{"ok":true}' })), { ok: true });
});
