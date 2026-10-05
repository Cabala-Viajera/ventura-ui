This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Newsletter signup

The footer subscribes email addresses immediately through Resend. Set these
server-only variables in `.env.local` and in your hosting provider's environment:

```dotenv
RESEND_API_KEY=your-resend-api-key
RESEND_SEGMENT_ID=your-newsletter-segment-id
```

Create a newsletter segment in the Resend dashboard and copy its ID. Create an
API key with contact-management access (a sending-only key is insufficient).
Keep the API key private: never prefix it with `NEXT_PUBLIC_` or commit it.
Restart the development server after changing environment variables.

To verify the integration, submit a test email in the footer and check that it
appears subscribed in the configured segment. Repeat the submission to verify
that no duplicate is created. Unsubscribe the test contact in Resend, then submit
again to verify reactivation. Check the form on mobile and with keyboard navigation.

This integration only collects subscribers. Send newsletter campaigns through
Resend; it does not send welcome emails, confirmation emails, or post notifications.
Missing configuration or provider failures display a retry message.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
