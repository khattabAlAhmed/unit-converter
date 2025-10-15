import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import LanguageProvider from '@/components/LanguageProvider';
import Header from '@/components/Header';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Choose font class based on locale
  const fontClass ='font-sans';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={fontClass}>
      <body className="antialiased">
        <LanguageProvider messages={messages} locale={locale}>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
