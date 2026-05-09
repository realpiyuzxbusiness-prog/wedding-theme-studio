import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Types ──────────────────────────────────────────────────────────────
interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  venueCity: string;
  packageName: string;
  services: string[];
  message?: string;
  estimatedTotal: number;
}

// ── Helpers ────────────────────────────────────────────────────────────
const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ── Email Templates ────────────────────────────────────────────────────

/** Email sent to the CUSTOMER confirming receipt */
function customerEmailHtml(data: BookingPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:40px 30px;text-align:center;">
        <h1 style="color:#c9a96e;font-size:24px;margin:0;letter-spacing:3px;font-weight:300;">WEDDING THEME STUDIO</h1>
        <p style="color:#ffffff80;font-size:11px;letter-spacing:4px;margin:8px 0 0;text-transform:uppercase;">Wedding Photography</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="color:#1a1a1a;font-size:20px;margin:0 0 8px;font-weight:400;">Thank you, ${data.name}! ✨</h2>
        <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px;">
          We've received your booking enquiry and our team is reviewing it right now.
          Expect a call or WhatsApp message within <strong>2 hours</strong>.
        </p>

        <!-- Booking Summary Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:1px solid #c9a96e30;border-radius:4px;">
          <tr><td style="padding:20px 24px 8px;">
            <p style="font-size:10px;letter-spacing:3px;color:#c9a96e;text-transform:uppercase;margin:0;font-weight:700;">Your Booking Summary</p>
          </td></tr>
          <tr><td style="padding:8px 24px;">
            <table width="100%" style="font-size:13px;color:#333;">
              <tr><td style="padding:6px 0;color:#999;width:120px;">Date</td><td style="padding:6px 0;font-weight:600;">${fmtDate(data.weddingDate)}</td></tr>
              <tr><td style="padding:6px 0;color:#999;">Location</td><td style="padding:6px 0;font-weight:600;">${data.venueCity}</td></tr>
              <tr><td style="padding:6px 0;color:#999;">Package</td><td style="padding:6px 0;font-weight:600;">${data.packageName}</td></tr>
              <tr><td style="padding:6px 0;color:#999;">Services</td><td style="padding:6px 0;font-weight:600;">${data.services.join(', ') || 'None selected'}</td></tr>
              <tr><td colspan="2" style="border-top:1px solid #eee;padding:12px 0 6px;">
                <table width="100%"><tr>
                  <td style="color:#999;font-size:13px;">Estimated Total</td>
                  <td style="text-align:right;font-size:18px;color:#c9a96e;font-weight:700;">${data.estimatedTotal > 0 ? fmtINR(data.estimatedTotal) : 'Custom Quote'}</td>
                </tr></table>
              </td></tr>
            </table>
          </td></tr>
        </table>

        ${data.message ? `<p style="margin:20px 0 0;padding:16px;background:#f5f5f5;border-left:3px solid #c9a96e;font-size:13px;color:#555;font-style:italic;">"${data.message}"</p>` : ''}

        <p style="color:#999;font-size:12px;margin:28px 0 0;text-align:center;">
          Questions? Reply to this email or WhatsApp us at <strong>+91 8802405067</strong>
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background:#1a1a1a;padding:20px 30px;text-align:center;">
        <p style="color:#ffffff50;font-size:11px;margin:0;">© ${new Date().getFullYear()} Wedding Theme Studio · Wedding Photography · All Rights Reserved</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Email sent to the STUDIO OWNER as a lead notification */
function ownerEmailHtml(data: BookingPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#c9a96e;padding:20px 30px;">
        <h1 style="color:#fff;font-size:18px;margin:0;">🔔 New Booking Lead!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px;">
        <table width="100%" style="font-size:14px;color:#333;">
          <tr><td style="padding:8px 0;color:#999;width:140px;vertical-align:top;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#c9a96e;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Phone</td><td style="padding:8px 0;"><a href="tel:+91${data.phone}" style="color:#c9a96e;">+91 ${data.phone}</a></td></tr>
          <tr><td colspan="2" style="border-top:1px solid #eee;padding:4px 0;"></td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Wedding Date</td><td style="padding:8px 0;font-weight:600;">${fmtDate(data.weddingDate)}</td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Location</td><td style="padding:8px 0;">${data.venueCity}</td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Package</td><td style="padding:8px 0;font-weight:600;">${data.packageName}</td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Services</td><td style="padding:8px 0;">${data.services.join(', ') || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#999;vertical-align:top;">Est. Total</td><td style="padding:8px 0;font-size:18px;font-weight:700;color:#c9a96e;">${data.estimatedTotal > 0 ? fmtINR(data.estimatedTotal) : 'Custom Quote'}</td></tr>
          ${data.message ? `<tr><td style="padding:8px 0;color:#999;vertical-align:top;">Message</td><td style="padding:8px 0;font-style:italic;">"${data.message}"</td></tr>` : ''}
        </table>
        <div style="margin-top:24px;text-align:center;">
          <a href="https://api.whatsapp.com/send/?phone=91${data.phone}&text=Hi%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20your%20booking%20enquiry%20with%20Wedding%20Theme%20Studio!%20Let%27s%20discuss%20the%20details." 
             style="display:inline-block;background:#25D366;color:#fff;padding:12px 28px;text-decoration:none;border-radius:4px;font-size:13px;font-weight:600;">
            💬 WhatsApp ${data.name}
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Resend API Helper ──────────────────────────────────────────────────
async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  from: string = 'Wedding Theme Studio <bookings@weddingthemestudio.com>'
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Resend API error (${res.status}): ${JSON.stringify(err)}`);
  }

  return res.json();
}

// ── Handler ────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }
  if (!ownerEmail) {
    console.error('OWNER_EMAIL is not set');
    return res.status(500).json({ error: 'Owner email not configured' });
  }

  try {
    const data = req.body as BookingPayload;

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.weddingDate || !data.packageName) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    // Send both emails in parallel
    const results = await Promise.allSettled([
      // 1. Confirmation to customer
      sendEmail(
        apiKey,
        data.email,
        `Booking Confirmed ✨ — Wedding Theme Studio`,
        customerEmailHtml(data)
      ),
      // 2. Lead notification to owner
      sendEmail(
        apiKey,
        ownerEmail,
        `🔔 New Lead: ${data.name} — ${data.packageName} Package`,
        ownerEmailHtml(data)
      ),
    ]);

    const customerResult = results[0];
    const ownerResult = results[1];

    console.log('Customer email:', customerResult.status, customerResult.status === 'fulfilled' ? customerResult.value : (customerResult as PromiseRejectedResult).reason?.message);
    console.log('Owner email:', ownerResult.status, ownerResult.status === 'fulfilled' ? ownerResult.value : (ownerResult as PromiseRejectedResult).reason?.message);

    // At least one email should succeed for a 200 response
    if (customerResult.status === 'rejected' && ownerResult.status === 'rejected') {
      return res.status(500).json({
        error: 'Both emails failed',
        details: {
          customer: (customerResult as PromiseRejectedResult).reason?.message,
          owner: (ownerResult as PromiseRejectedResult).reason?.message,
        },
      });
    }

    return res.status(200).json({
      success: true,
      customerEmail: customerResult.status,
      ownerEmail: ownerResult.status,
    });
  } catch (err: any) {
    console.error('Email handler error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
