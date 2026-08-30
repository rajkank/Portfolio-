function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function nl2br(value) {
  return escapeHtml(value).replace(/\r\n|\n|\r/g, '<br/>')
}

const FONT = "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', Times, serif"

function wrapEmail({ preheader, innerHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>Raj Sudhir Kank</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;border-collapse:collapse;">
          <tr>
            <td style="height:3px;font-size:0;line-height:3px;background-color:#10b981;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:22px 24px 24px;background-color:#09090b;border:1px solid #27272a;border-top:0;">
              <p style="margin:0 0 4px;font-family:${SERIF};font-size:16px;color:#fafafa;">Raj Sudhir Kank</p>
              <p style="margin:0 0 22px;font-family:${FONT};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#34d399;">AI Engineer</p>
              ${innerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function line(label, valueHtml) {
  return `<p style="margin:0 0 12px;font-family:${FONT};font-size:15px;line-height:1.55;color:#e4e4e7;">
    <span style="color:#71717a;">${escapeHtml(label)}: </span>${valueHtml}
  </p>`
}

export function ownerHtml({ name, email, subject, message }) {
  const topic = subject || 'Portfolio inquiry'
  const innerHtml = `
    ${line('Name', escapeHtml(name))}
    ${line('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#6ee7b7;text-decoration:none;">${escapeHtml(email)}</a>`)}
    ${line('Subject', escapeHtml(topic))}
    ${line('Message', `<br/>${nl2br(message)}`)}
  `

  return wrapEmail({
    preheader: `Message from ${name}`,
    innerHtml,
  })
}

export function autoReplyHtml({ name }) {
  const innerHtml = `
    <p style="margin:0 0 12px;font-family:${FONT};font-size:15px;line-height:1.7;color:#e4e4e7;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.7;color:#a1a1aa;">Thanks for your message. I’ll get back to you soon.</p>
    <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.7;color:#e4e4e7;">Raj Sudhir Kank</p>
  `

  return wrapEmail({
    preheader: 'Thanks — I received your message.',
    innerHtml,
  })
}
