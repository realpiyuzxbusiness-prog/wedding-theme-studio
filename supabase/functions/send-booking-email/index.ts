import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
 
// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — all secrets via Supabase Edge Function Secrets (never hardcode)
// Dashboard → Edge Functions → your function → Secrets
// Add: RESEND_API_KEY = re_your_new_key_here
// ─────────────────────────────────────────────────────────────────────────────
const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY") ?? ""
const OWNER_EMAIL      = "opomprakash011@gmail.com"
const FROM_EMAIL       = "Wedding Theme Studio <hello@weddingthemestudio.com>"
const STUDIO_PHONE     = "+91 88024 05067"
const STUDIO_WEBSITE   = "https://weddingthemestudio.com"
const STUDIO_WHATSAPP  = "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services."
const STUDIO_INSTAGRAM = "https://www.instagram.com/weddingthemestudio/"
const STUDIO_ADDRESS   = "RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046"
 
// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const formatDate = (d: string): string => {
  if (!d) return "Not specified"
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    })
  } catch {
    return d
  }
}
 
const sanitizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("91") && digits.length === 12) return digits
  if (digits.length === 10) return `91${digits}`
  return digits
}
 
const sendEmail = async (to: string, subject: string, html: string): Promise<unknown> => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      reply_to: OWNER_EMAIL,
      to: [to],
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<mailto:${OWNER_EMAIL}?subject=unsubscribe>`,
        "X-Entity-Ref-ID": `wts-${Date.now()}`,
      },
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Resend ${res.status} → ${to}: ${JSON.stringify(data)}`)
  return data
}
 
// Decorative petal SVG row — purely presentational
const petalRow = (count: number): string => {
  let html = `<div style="text-align:center;padding:8px 0;line-height:1;">`
  for (let i = 0; i < count; i++) {
    const rotate = (i * 37 + 15) % 180
    const size   = 12 + (i % 3) * 4
    const margin = 3 + (i % 4)
    const opacity = (0.3 + (i % 4) * 0.1).toFixed(1)
    html += `<svg width="${size}" height="${size + 4}" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;margin:0 ${margin}px;transform:rotate(${rotate}deg);opacity:${opacity};"><path d="M9 1C9 1 1 7 1 13C1 17.4 4.6 21 9 21C13.4 21 17 17.4 17 13C17 7 9 1 9 1Z" fill="#D4698A"/></svg>`
  }
  html += `</div>`
  return html
}
 
// Shared CSS values to keep templates DRY
const C = {
  rose:    "#C94070",
  roseLt:  "#E8A0B0",
  dark:    "#1a1a1a",
  bg:      "#F5EDE8",
  blossom: "#FFF0F4",
  border:  "#F5C0CC",
  borderLt:"#FDF0F3",
  muted:   "#B08090",
  text:    "#4A3038",
  gradient:"background:linear-gradient(90deg,#C94070 0%,#E8A0B0 50%,#C94070 100%)",
}
 
const labelCell = (label: string): string =>
  `<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};width:38%;vertical-align:top;">
     <p style="margin:0;font-size:10px;letter-spacing:0.13em;color:${C.rose};text-transform:uppercase;font-weight:bold;">${label}</p>
   </td>`
 
// ─────────────────────────────────────────────────────────────────────────────
// EMAIL TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────
 
function buildOwnerEmail(fields: Record<string, string>): string {
  const { name, email, phone, wedding_date, venue_city, package_name, message, estimated_total } = fields
  const waPhone = sanitizePhone(phone || "")
 
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;box-shadow:0 4px 32px rgba(180,80,100,0.10);">
 
  <tr><td style="${C.gradient};height:3px;font-size:0;">&nbsp;</td></tr>
 
  <!-- HEADER -->
  <tr>
    <td style="background:${C.dark};padding:36px 40px 28px;text-align:center;">
      ${petalRow(7)}
      <p style="margin:12px 0 4px;font-size:10px;letter-spacing:0.4em;color:${C.roseLt};text-transform:uppercase;">✦ &nbsp;Est. 2014&nbsp; ✦</p>
      <h1 style="margin:8px 0 4px;font-size:11px;letter-spacing:0.35em;color:#ffffff;text-transform:uppercase;font-weight:400;">WEDDING &nbsp;<span style="color:${C.roseLt};">THEME</span>&nbsp; STUDIO</h1>
      <div style="width:40px;height:1px;background:${C.rose};margin:12px auto;"></div>
      <p style="margin:0;font-size:22px;color:#ffffff;font-weight:400;letter-spacing:0.05em;">New Booking Enquiry</p>
      <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.2em;text-transform:uppercase;">Action required · Respond within 2 hours</p>
      ${petalRow(5)}
    </td>
  </tr>
 
  <!-- ALERT BANNER -->
  <tr>
    <td style="background:${C.blossom};border-bottom:1px solid ${C.border};padding:14px 40px;">
      <p style="margin:0;font-size:13px;color:${C.rose};font-weight:bold;">🔔 &nbsp; New lead from weddingthemestudio.com</p>
      <p style="margin:4px 0 0;font-size:11px;color:${C.muted};">Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </td>
  </tr>
 
  <!-- CLIENT DETAILS -->
  <tr>
    <td style="padding:32px 40px 0;">
      <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.25em;color:${C.rose};text-transform:uppercase;font-weight:bold;border-bottom:1px solid #F5E0E6;padding-bottom:10px;">Client Information</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>${labelCell("Full Name")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:16px;color:${C.dark};font-weight:bold;">${name}</p></td></tr>
        <tr>${labelCell("Email")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><a href="mailto:${email}" style="font-size:14px;color:${C.rose};text-decoration:none;">${email}</a></td></tr>
        <tr>${labelCell("Phone")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><a href="tel:${phone}" style="font-size:14px;color:${C.dark};text-decoration:none;">${phone || "Not provided"}</a></td></tr>
        <tr>${labelCell("Wedding Date")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:14px;color:${C.dark};font-style:italic;">${formatDate(wedding_date)}</p></td></tr>
        <tr>${labelCell("Venue / City")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:14px;color:${C.dark};">${venue_city || "Not specified"}</p></td></tr>
        <tr>${labelCell("Package")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><span style="display:inline-block;background:${C.dark};color:${C.roseLt};padding:4px 14px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">${package_name || "Not selected"}</span></td></tr>
        ${estimated_total ? `<tr>${labelCell("Estimated Total")}<td style="padding:11px 0;"><p style="margin:0;font-size:18px;color:${C.rose};font-weight:bold;">₹${estimated_total}</p></td></tr>` : ""}
      </table>
    </td>
  </tr>
 
  <!-- MESSAGE -->
  <tr>
    <td style="padding:24px 40px 0;">
      <div style="background:#FFF8FA;border-left:3px solid ${C.rose};padding:18px 20px;">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;color:${C.rose};text-transform:uppercase;font-weight:bold;">Client Message</p>
        <p style="margin:0;font-size:14px;color:${C.text};line-height:1.8;font-style:italic;">"${message || "No message provided."}"</p>
      </div>
    </td>
  </tr>
 
  <tr><td style="padding:20px 40px 0;">${petalRow(9)}</td></tr>
 
  <!-- CTA BUTTONS -->
  <tr>
    <td style="padding:16px 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:8px;">
            <a href="mailto:${email}?subject=Re%3A%20Your%20Wedding%20Enquiry%20%E2%80%94%20Wedding%20Theme%20Studio"
               style="display:block;background:${C.rose};color:#ffffff;text-align:center;padding:14px 0;font-size:10px;font-weight:bold;letter-spacing:0.2em;text-decoration:none;text-transform:uppercase;">✉ Reply to Client</a>
          </td>
          <td style="padding-left:8px;">
            <a href="https://api.whatsapp.com/send/?phone=${waPhone}&text=Hi+${encodeURIComponent(name)}%2C+this+is+Om+Prakash+from+Wedding+Theme+Studio!"
               style="display:block;background:#25D366;color:#ffffff;text-align:center;padding:14px 0;font-size:10px;font-weight:bold;letter-spacing:0.2em;text-decoration:none;text-transform:uppercase;">💬 WhatsApp Client</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
 
  <!-- FOOTER -->
  <tr>
    <td style="background:${C.dark};padding:24px 40px;text-align:center;">
      ${petalRow(6)}
      <p style="margin:8px 0 0;font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.12em;">Wedding Theme Studio · New Delhi · Automated Booking Notification</p>
    </td>
  </tr>
  <tr><td style="${C.gradient};height:3px;font-size:0;">&nbsp;</td></tr>
 
</table>
</td></tr>
</table>
</body>
</html>`
}
 
function buildClientEmail(fields: Record<string, string>): string {
  const { name, email: _email, wedding_date, venue_city, package_name, estimated_total } = fields
 
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;box-shadow:0 4px 32px rgba(180,80,100,0.10);">
 
  <tr><td style="${C.gradient};height:3px;font-size:0;">&nbsp;</td></tr>
 
  <!-- HEADER -->
  <tr>
    <td style="background:${C.dark};padding:48px 40px 40px;text-align:center;">
      ${petalRow(9)}
      <p style="margin:14px 0 6px;font-size:10px;letter-spacing:0.4em;color:${C.roseLt};text-transform:uppercase;">✦ &nbsp;Est. 2014&nbsp; ✦</p>
      <h1 style="margin:6px 0;font-size:13px;letter-spacing:0.35em;color:#ffffff;text-transform:uppercase;font-weight:400;">WEDDING &nbsp;<span style="color:${C.roseLt};">THEME</span>&nbsp; STUDIO</h1>
      <p style="margin:4px 0 0;font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.35);text-transform:uppercase;">Delhi NCR's Trusted Wedding Photographer</p>
      <div style="width:40px;height:1px;background:${C.rose};margin:20px auto;"></div>
      <h2 style="margin:0;font-size:36px;color:#ffffff;font-weight:400;line-height:1.2;letter-spacing:0.03em;">Thank you,<br/><em style="color:${C.roseLt};font-style:italic;">${name}.</em></h2>
      <p style="margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;max-width:380px;">We've received your enquiry for <strong style="color:${C.roseLt};">${package_name || "a wedding package"}</strong>. We'll be in touch within <strong style="color:#ffffff;">2 hours</strong>.</p>
      ${petalRow(7)}
    </td>
  </tr>
 
  <!-- CONFIRMATION BADGE -->
  <tr>
    <td style="padding:0 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.blossom};border:1px solid ${C.border};margin:28px 0 0;">
        <tr>
          <td style="padding:18px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:36px;vertical-align:top;padding-top:2px;">
                  <div style="width:28px;height:28px;background:${C.rose};border-radius:50%;text-align:center;line-height:28px;font-size:14px;color:#fff;">✓</div>
                </td>
                <td>
                  <p style="margin:0;font-size:14px;font-weight:bold;color:${C.dark};">Booking Request Confirmed</p>
                  <p style="margin:4px 0 0;font-size:13px;color:${C.muted};line-height:1.6;">Your preferred date <strong style="color:${C.rose};">${formatDate(wedding_date)}</strong> has been noted. We'll confirm availability shortly.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
 
  <!-- BOOKING SUMMARY -->
  <tr>
    <td style="padding:32px 40px 0;">
      <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.25em;color:${C.rose};text-transform:uppercase;font-weight:bold;border-bottom:1px solid #F5E0E6;padding-bottom:10px;">Your Booking Summary</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>${labelCell("Name")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:14px;color:${C.dark};font-weight:bold;">${name}</p></td></tr>
        <tr>${labelCell("Wedding Date")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:14px;color:${C.dark};font-style:italic;">${formatDate(wedding_date)}</p></td></tr>
        <tr>${labelCell("Venue / City")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><p style="margin:0;font-size:14px;color:${C.dark};">${venue_city || "TBD"}</p></td></tr>
        <tr>${labelCell("Package")}<td style="padding:11px 0;border-bottom:1px solid ${C.borderLt};"><span style="display:inline-block;background:${C.dark};color:${C.roseLt};padding:4px 14px;font-size:10px;letter-spacing:0.15em;font-weight:bold;text-transform:uppercase;">${package_name || "To be confirmed"}</span></td></tr>
        ${estimated_total ? `<tr>${labelCell("Estimated Total")}<td style="padding:11px 0;"><p style="margin:0;font-size:18px;color:${C.rose};font-weight:bold;">₹${estimated_total}</p></td></tr>` : ""}
      </table>
    </td>
  </tr>
 
  <tr><td style="padding:20px 40px 0;">${petalRow(11)}</td></tr>
 
  <!-- NEXT STEPS -->
  <tr>
    <td style="padding:20px 40px 0;">
      <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.25em;color:${C.rose};text-transform:uppercase;font-weight:bold;border-bottom:1px solid #F5E0E6;padding-bottom:10px;">What Happens Next</p>
      ${[
        ["We review your enquiry",   "Om Prakash personally reviews every booking within 2 hours."],
        ["We call or WhatsApp you",  "We discuss your vision, availability, and package details."],
        ["Your date gets locked in", "Limited bookings per month — premium quality guaranteed."],
      ].map(([title, body], i) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td style="vertical-align:top;padding-right:16px;width:36px;">
            <div style="width:28px;height:28px;border:1.5px solid ${C.rose};border-radius:50%;text-align:center;line-height:26px;font-size:12px;color:${C.rose};font-weight:bold;">${i + 1}</div>
          </td>
          <td style="padding-bottom:16px;border-bottom:1px dashed #F5E0E6;">
            <p style="margin:0;font-size:13px;font-weight:bold;color:${C.dark};">${title}</p>
            <p style="margin:4px 0 0;font-size:13px;color:${C.muted};line-height:1.6;">${body}</p>
          </td>
        </tr>
      </table>`).join("")}
    </td>
  </tr>
 
  <!-- SOCIAL PROOF -->
  <tr>
    <td style="background:${C.bg};border-top:1px solid #EDD5DC;border-bottom:1px solid #EDD5DC;padding:24px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="text-align:center;border-right:1px solid #EDD5DC;"><p style="margin:0;font-size:28px;font-weight:400;color:${C.rose};font-style:italic;">500+</p><p style="margin:4px 0 0;font-size:10px;letter-spacing:0.15em;color:${C.muted};text-transform:uppercase;">Weddings</p></td>
          <td style="text-align:center;border-right:1px solid #EDD5DC;"><p style="margin:0;font-size:28px;font-weight:400;color:${C.rose};font-style:italic;">10+</p><p style="margin:4px 0 0;font-size:10px;letter-spacing:0.15em;color:${C.muted};text-transform:uppercase;">Years</p></td>
          <td style="text-align:center;"><p style="margin:0;font-size:28px;font-weight:400;color:${C.rose};font-style:italic;">5.0★</p><p style="margin:4px 0 0;font-size:10px;letter-spacing:0.15em;color:${C.muted};text-transform:uppercase;">Google Rating</p></td>
        </tr>
      </table>
    </td>
  </tr>
 
  <!-- CONTACT -->
  <tr>
    <td style="padding:28px 40px 0;">
      <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.25em;color:${C.rose};text-transform:uppercase;font-weight:bold;border-bottom:1px solid #F5E0E6;padding-bottom:10px;">Reach Us Directly</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${C.borderLt};width:28px;vertical-align:middle;">📞</td>
          <td style="padding:10px 0 10px 10px;border-bottom:1px solid ${C.borderLt};"><a href="tel:+918802405067" style="font-size:14px;color:${C.dark};text-decoration:none;font-weight:bold;">${STUDIO_PHONE}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${C.borderLt};vertical-align:middle;">📸</td>
          <td style="padding:10px 0 10px 10px;border-bottom:1px solid ${C.borderLt};"><a href="${STUDIO_INSTAGRAM}" style="font-size:14px;color:${C.rose};text-decoration:none;">@weddingthemestudio</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;vertical-align:top;">📍</td>
          <td style="padding:10px 0 10px 10px;"><p style="margin:0;font-size:13px;color:${C.muted};line-height:1.6;">${STUDIO_ADDRESS}</p></td>
        </tr>
      </table>
    </td>
  </tr>
 
  <!-- CTA BUTTONS -->
  <tr>
    <td style="padding:28px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:8px;"><a href="${STUDIO_WEBSITE}" style="display:block;background:${C.dark};color:${C.roseLt};text-align:center;padding:15px 0;font-size:10px;font-weight:bold;letter-spacing:0.25em;text-decoration:none;text-transform:uppercase;">VIEW OUR PORTFOLIO</a></td>
          <td style="padding-left:8px;"><a href="${STUDIO_WHATSAPP}" style="display:block;background:${C.rose};color:#ffffff;text-align:center;padding:15px 0;font-size:10px;font-weight:bold;letter-spacing:0.25em;text-decoration:none;text-transform:uppercase;">💬 WHATSAPP US</a></td>
        </tr>
      </table>
    </td>
  </tr>
 
  <!-- FOOTER -->
  <tr>
    <td style="background:${C.dark};padding:32px 40px;text-align:center;">
      ${petalRow(8)}
      <p style="margin:10px 0 4px;font-size:11px;letter-spacing:0.35em;color:${C.roseLt};text-transform:uppercase;">WEDDING &nbsp;THEME&nbsp; STUDIO</p>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;">New Delhi &nbsp;·&nbsp; Est. 2014 &nbsp;·&nbsp; Om Prakash</p>
      <p style="margin:16px 0 0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.7;">You received this because you submitted a booking on our website.<br/>Questions? Simply reply to this email.</p>
    </td>
  </tr>
  <tr><td style="${C.gradient};height:3px;font-size:0;">&nbsp;</td></tr>
 
</table>
</td></tr>
</table>
</body>
</html>`
}
 
// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────
serve(async (req) => {
  // CORS preflight (if called from browser directly)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }
 
  try {
    // Guard: API key must be set
    if (!RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY secret not set in Supabase Edge Function Secrets")
      return new Response(
        JSON.stringify({ error: "Email service not configured. Contact administrator." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
 
    const payload = await req.json()
    const record  = payload.record ?? payload  // supports both direct call & DB webhook
 
    const { name, email, phone, wedding_date, venue_city, package_name, message, estimated_total } = record
 
    // Guard: minimum required fields
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name and email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }
 
    const fields: Record<string, string> = {
      name:            name           ?? "",
      email:           email          ?? "",
      phone:           phone          ?? "",
      wedding_date:    wedding_date   ?? "",
      venue_city:      venue_city     ?? "",
      package_name:    package_name   ?? "",
      message:         message        ?? "",
      estimated_total: estimated_total ?? "",
    }
 
    const ownerSubject = `🌸 New Booking: ${name} — ${package_name || "Package TBD"} | ${formatDate(wedding_date)}`
    const clientSubject = `Your Enquiry is Confirmed — Wedding Theme Studio`
 
    // Send both emails in parallel for speed
    const [ownerResult, clientResult] = await Promise.all([
      sendEmail(OWNER_EMAIL, ownerSubject,  buildOwnerEmail(fields)),
      sendEmail(email,       clientSubject, buildClientEmail(fields)),
    ])
 
    console.log("✅ Owner notified:",   JSON.stringify(ownerResult))
    console.log("✅ Client confirmed:", JSON.stringify(clientResult))
 
    return new Response(
      JSON.stringify({ success: true, owner: ownerResult, client: clientResult }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
 
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error("❌ Edge function error:", msg)
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})