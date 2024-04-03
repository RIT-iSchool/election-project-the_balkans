import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from 'frosted-ui';
import 'frosted-ui/styles.css';
import './globals.css';
import { ClientProviders } from './client-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'American Dream',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://rsms.me/" rel="preconnect" />
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </head>
      <ClientProviders>
        <body className={inter.className}>
          <Theme>
            {children}
          </Theme>
        </body>
      </ClientProviders>
    </html>
  );
}
