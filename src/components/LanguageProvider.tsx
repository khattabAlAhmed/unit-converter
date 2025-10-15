'use client';

import {NextIntlClientProvider} from 'next-intl';
import DocumentAttributesHandler from './DocumentAttributesHandler';

type Props = {
  children: React.ReactNode;
  messages: any;
  locale: string;
};

export default function LanguageProvider({children, messages, locale}: Props) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <DocumentAttributesHandler />
      {children}
    </NextIntlClientProvider>
  );
}
