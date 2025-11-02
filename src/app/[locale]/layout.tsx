import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from 'next';

import LanguageProvider from '@/components/LanguageProvider';
import {ThemeProvider} from '@/components/theme/ThemeProvider';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import AdSenseScript from '@/components/ads/AdSenseScript';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      'google-adsense-account': 'ca-pub-2044363478388359',
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Choose font class based on locale
  const fontClass ='font-sans';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={fontClass}>
      <head>
        <AdSenseScript />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider messages={messages} locale={locale}>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
