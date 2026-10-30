import { SITE } from '../data/site';

// Emails a message to SITE.email through the form endpoint. Throws when it was not
// delivered (offline, or the inbox has not been activated yet) so callers can offer
// a mailto link instead.
export async function sendMessage(subject, fields) {
  const response = await fetch(SITE.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...fields, _subject: subject, _template: 'table', _captcha: 'false' }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || String(result.success) === 'false') throw new Error(result.message || 'The message was not sent');
}
