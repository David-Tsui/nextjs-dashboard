import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { AppProgressProviders } from './providers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaSrc = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <Script src={recaptchaSrc} strategy="beforeInteractive" />
        <AppProgressProviders>{children}</AppProgressProviders>
      </body>
    </html>
  );
}
