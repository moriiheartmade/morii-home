export const config = {
  app: {
    name: 'Morii Home',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
  },
  download: {
    ttlHours: parseInt(process.env.DOWNLOAD_TOKEN_TTL_HOURS || '48'),
    quotaDefault: parseInt(process.env.DOWNLOAD_QUOTA_DEFAULT || '5'),
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID!,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    mode: (process.env.PAYPAL_MODE || 'sandbox') as 'sandbox' | 'live',
  },
  email: {
    from: process.env.GMAIL_USER || 'moriiheartmade@gmail.com',
    user: process.env.GMAIL_USER!,
    password: process.env.GMAIL_APP_PASSWORD!,
  },
  admin: {
    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin',
  },
}
