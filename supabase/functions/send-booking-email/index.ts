import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record || payload

    // ── CONFIG ────────────────────────────────────────────────────
    const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY") ?? "re_DrWwn7kL_GMgmstf7B78U2t7x62zG82Tr"
    const OWNER_EMAIL      = "realpiyuzx.services@gmail.com"   // change to opomprakash011@gmail.com after domain verify
    const STUDIO_PHONE     = "+91 88024 05067"
    const STUDIO_WEBSITE   = "https://weddingthemestudio.com"
    const STUDIO_WHATSAPP  = "https://api.whatsapp.com/send/?phone=918802405067&text=Hi%2C+I%27m+interested+in+your+wedding+photography+services."
    const STUDIO_INSTAGRAM = "https://www.instagram.com/weddingthemestudio/"
    const STUDIO_ADDRESS   = "RZ-64/284, Geetanjali Park, West Sagarpur, New Delhi – 110046"

    const { name, email, phone, wedding_date, venue_city, package_name, message, estimated_total } = record

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Missing name or email" }), { status: 400 })
    }

    const formatDate = (d: string) => {
      if (!d) return "Not specified"
      try {
        return new Date(d).toLocaleDateString("en-IN", {
          weekday: "long", year: "numeric", month: "long", day: "numeric"
        })
      } catch { return d }
    }

    const sendEmail = async (to: string, subject: string, html: string) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Wedding Theme Studio <bookings@weddingthemestudio.com>",
          reply_to: OWNER_EMAIL,
          to: [to],
          subject,
          html,
          headers: {
            "List-Unsubscribe": `<mailto:${OWNER_EMAIL}?subject=unsubscribe>`,
            "X-Entity-Ref-ID": `wts-${Date.now()}`
          }
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(`Resend error to ${to}: ${JSON.stringify(data)}`)
      return data
    }

    // ── SHARED STYLES & PETALS ────────────────────────────────────
    const petalRow = (count: number) => {
      let html = `<div style="text-align:center;padding:8px 0;line-height:1;">`
      for (let i = 0; i < count; i++) {
        const rotate = (i * 37 + 15) % 180
        const size = 12 + (i % 3) * 4
        html += `<svg width="${size}" height="${size+4}" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;margin:0 ${3+i%4}px;transform:rotate(${rotate}deg);opacity:${0.3+((i%4)*0.1)};"><path d="M9 1C9 1 1 7 1 13C1 17.4 4.6 21 9 21C13.4 21 17 17.4 17 13C17 7 9 1 9 1Z" fill="#D4698A"/></svg>`
      }
      html += `</div>`
      return html
    }

    // ════════════════════════════════════════════════════════════════
    // EMAIL 1 — OWNER NOTIFICATION
    // ════════════════════════════════════════════════════════════════
    const ownerHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F5EDE8;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EDE8;padding:32px 16px;">
<tr><td align="center">
<table width="600" style="max-width:600px;width:100%;background:#ffffff;box-shadow:0 4px 32px rgba(180,80,100,0.10);">
  <tr><td style="background:linear-gradient(90deg,#C94070 0%,#E8A0B0 50%,#C94070 100%);height:3px;"></td></tr>
  <tr>
    <td style="background:#1a1a1a;padding:36px 40px 28px;text-align:center;">
      ${petalRow(7)}
      <h1 style="margin:8px 0 4px;font-size:11px;letter-spacing:0.35em;color:#ffffff;text-transform:uppercase;font-weight:400;">WEDDING <span style="color:#E8A0B0;">THEME</span> STUDIO</h1>
      <p style="margin:0;font-size:22px;color:#ffffff;font-weight:400;">New Booking Enquiry</p>
    </td>
  </tr>
  <tr>
    <td style="background:#FFF0F4;border-bottom:1px solid #F5C0CC;padding:14px 40px;">
      <p style="margin:0;font-size:13px;color:#C94070;font-weight:bold;">🔔 &nbsp; New lead from weddingthemestudio.com</p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 40px;">
      <table width="100%" style="font-family:Georgia,serif;">
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;width:38%;"><strong>Name</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;">${name}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><strong>Email</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><a href="mailto:${email}" style="color:#C94070;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><strong>Phone</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><a href="tel:${phone}" style="color:#1a1a1a;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><strong>Date</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;">${formatDate(wedding_date)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><strong>Venue</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;">${venue_city || "Not specified"}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;"><strong>Package</strong></td><td style="padding:12px 0;border-bottom:1px solid #FDF0F3;">${package_name}</td></tr>
      </table>
      <div style="margin-top:20px;padding:15px;background:#FFF8FA;border-left:3px solid #C94070;">
        <p style="margin:0;font-style:italic;">"${message || 'No message provided.'}"</p>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:0 40px 32px;text-align:center;">
      <a href="https://api.whatsapp.com/send/?phone=${(phone || "").replace(/\D/g,"")}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 25px;text-decoration:none;font-size:12px;font-weight:bold;border-radius:4px;">💬 WhatsApp Client</a>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`

    // ════════════════════════════════════════════════════════════════
    // EMAIL 2 — CLIENT CONFIRMATION
    // ════════════════════════════════════════════════════════════════
    const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F5EDE8;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EDE8;padding:32px 16px;">
<tr><td align="center">
<table width="600" style="max-width:600px;width:100%;background:#ffffff;box-shadow:0 4px 32px rgba(180,80,100,0.10);">
  <tr><td style="background:linear-gradient(90deg,#C94070 0%,#E8A0B0 50%,#C94070 100%);height:3px;"></td></tr>
  <tr>
    <td style="background:#1a1a1a;padding:48px 40px;text-align:center;">
      ${petalRow(9)}
      <h1 style="color:#ffffff;font-size:13px;letter-spacing:0.35em;">WEDDING <span style="color:#E8A0B0;">THEME</span> STUDIO</h1>
      <h2 style="color:#ffffff;font-size:32px;font-weight:400;">Thank you, <span style="color:#E8A0B0;">${name}.</span></h2>
      <p style="color:rgba(255,255,255,0.6);">We've received your enquiry for <strong>${package_name || "a wedding package"}</strong>.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:40px;text-align:center;">
      <p style="font-size:18px;color:#1a1a1a;">Your date <strong>${formatDate(wedding_date)}</strong> has been noted.</p>
      <p style="color:#B08090;line-height:1.6;">We'll be in touch within 2 hours on WhatsApp.</p>
      <div style="margin-top:30px;">
        <a href="${STUDIO_INSTAGRAM}" style="color:#C94070;text-decoration:none;margin:0 10px;">Instagram</a> • 
        <a href="${STUDIO_WEBSITE}" style="color:#C94070;text-decoration:none;margin:0 10px;">Website</a>
      </div>
    </td>
  </tr>
  <tr>
    <td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">Wedding Theme Studio · New Delhi · Est. 2014</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`

    // ── SEND BOTH ─────────────────────────────────────────────────
    const [ownerResult, clientResult] = await Promise.all([
      sendEmail(OWNER_EMAIL, `🌸 New Booking: ${name} — ${package_name || "Package TBD"} | ${formatDate(wedding_date)}`, ownerHtml),
      sendEmail(email, `Your Enquiry is Confirmed — Wedding Theme Studio`, clientHtml)
    ])

    console.log("✅ Emails sent successfully")

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json" }
    })

  } catch (error) {
    console.error("❌", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
