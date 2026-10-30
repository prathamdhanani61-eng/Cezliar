'use client';

import { useRef, useState } from 'react';
import { SITE, mailtoLink } from '../data/site';
import { sendMessage } from '../lib/messages';

// Sign-ups are emailed to SITE.email. If sending fails, the visitor can email us instead.
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const statusRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.elements._honey.value) return;
    setStatus('sending');
    try {
      await sendMessage('New newsletter sign-up — CEZLIAR website', { email, message: `Please add ${email} to the CEZLIAR newsletter.` });
      setStatus('sent');
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus('failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-[1_1_380px] flex-col gap-2">
      {status !== 'sent' && (
        <div className="flex flex-wrap gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input id="newsletter-email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="min-h-[52px] flex-[1_1_220px] rounded-full border border-line bg-white px-5 text-[15px] text-ink placeholder:text-muted focus:border-forest focus:outline-none" />
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button type="submit" disabled={status === 'sending'} className="btn-primary min-h-[52px] px-7 disabled:opacity-70">
            {status === 'sending' ? 'Sending…' : 'Subscribe'}
          </button>
        </div>
      )}
      <p ref={statusRef} tabIndex={-1} role="status" className={status === 'sent' ? 'text-[17px] text-forest focus:outline-none sm:text-right' : 'text-[13px] text-muted'}>
        {status === 'sent' && 'Thank you — you are on the list. Watch your inbox for our next letter.'}
        {status === 'failed' && <>We could not sign you up just now. <a href={mailtoLink('Newsletter sign-up', `Please add ${email} to the CEZLIAR newsletter.`)} className="text-forest underline underline-offset-2">Email us at {SITE.email}</a> and we will add you.</>}
        {(status === 'idle' || status === 'sending') && 'No spam — just the occasional letter.'}
      </p>
    </form>
  );
}
