import { sendViaNodemailer, sendNewsletterEmail } from '@/lib/email-nodemailer'

interface DownloadItem {
  title: string
  downloadUrl: string
  coverUrl?: string
}

interface OrderDetails {
  publicToken: string
  successUrl?: string
}

interface SendOrderEmailParams {
  toEmail: string
  orderId: string
  items: DownloadItem[]
  totalAmount: number
  publicToken?: string
  userName?: string
}

export async function sendOrderConfirmationEmail({
  toEmail,
  orderId,
  items,
  totalAmount,
  publicToken,
  userName,
}: SendOrderEmailParams): Promise<boolean> {
  console.log('📧 [EMAIL] Sending order confirmation email...')
  
  // Use Nodemailer directly
  return await sendViaNodemailer({
    toEmail,
    orderId,
    items,
    totalAmount,
    publicToken,
    userName,
  })
}

interface NewsletterParams {
  toEmail: string
  subject: string
  htmlContent: string
  textContent?: string
}

export async function sendNewsletter({
  toEmail,
  subject,
  htmlContent,
  textContent,
}: NewsletterParams): Promise<boolean> {
  console.log('📧 [EMAIL] Sending newsletter email...')
  
  return await sendNewsletterEmail({
    toEmail,
    subject,
    htmlContent,
    textContent,
  })
}

// Welcome email for new subscribers
export async function sendWelcomeEmail(toEmail: string, name?: string): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:#FFF8DC;background:linear-gradient(135deg,#FFF8DC,#FAEBD7);padding:40px 32px;text-align:center;">
            <h1 style="margin:0 0 24px;font-size:32px;font-weight:800;color:#8B4513;letter-spacing:-0.5px;">Morii Heartmade</h1>
            <h2 style="margin:0;font-size:26px;color:#000000;font-weight:800;letter-spacing:-0.5px;">Chào mừng bạn! 🎉</h2>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 8px;color:#374151;font-size:15px;">Xin chào${name ? ` ${name}` : ''},</p>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
              Cảm ơn bạn đã đăng ký nhận tin từ <strong>Morii Heartmade</strong>! 🎉<br/>
              Bạn sẽ nhận được thông báo về các pattern mới, tips may vá, và các ưu đãi đặc biệt.
            </p>

            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
              <p style="margin:0;color:#166534;font-size:13px;line-height:1.5;">
                💡 <strong>Mẹo nhỏ:</strong> Kiểm tra inbox của bạn để không bỏ lỡ các pattern mới nhất!
              </p>
            </div>
            
            <div style="margin-top:24px;text-align:center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products"
                 style="display:inline-block;background:linear-gradient(135deg,#8B4513,#A0522D);color:#fff;text-decoration:none;padding:12px 32px;border-radius:10px;font-size:14px;font-weight:600;">
                🧵 Xem các pattern
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Không muốn nhận email nữa? <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe" style="color:#8B4513;">Unsubscribe</a>
            </p>
            <p style="margin:8px 0 0;color:#d1d5db;font-size:11px;">© ${new Date().getFullYear()} Morii Heartmade · PDF sewing patterns for home decor</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return await sendNewsletterEmail({
    toEmail,
    subject: 'Chào mừng đến với Morii Heartmade! 🎉',
    htmlContent,
  })
}
