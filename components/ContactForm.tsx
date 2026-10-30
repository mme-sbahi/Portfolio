'use client';

import { useState } from 'react';
import { Arrow } from './Icons';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || status === 'sending') return;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const data = new FormData(form);
      const response = await fetch('https://formspree.io/f/mdalvnpr', {
        method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message'), _gotcha: data.get('website'), _subject: `Portfolio enquiry from ${data.get('name')}` }),
      });
      if (!response.ok) throw new Error('Delivery failed');
      setStatus('sent'); form.reset();
    } catch { setStatus('error'); } finally { clearTimeout(timeout); }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={120} /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
    <label>A little about your idea<textarea name="message" placeholder="A project, an opportunity, or just a hello…" required minLength={10} maxLength={5000} rows={2} /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="contact-form-bottom"><p className="form-note">Good work starts with a conversation.</p><button className="pill-button light-button" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send message'}<Arrow diagonal /></button></div>
    <p className={`form-status ${status === 'error' ? 'has-error' : ''}`} role="status" aria-live="polite">{status === 'sent' ? 'Message delivered. Thank you for reaching out!' : status === 'error' ? 'Your message couldn’t be delivered. Please try again, or reach out on LinkedIn below.' : ''}</p>
  </form>;
}
