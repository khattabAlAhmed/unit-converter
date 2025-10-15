'use client';

import {useLocale} from 'next-intl';
import {useEffect} from 'react';

export default function DocumentAttributesHandler() {
  const locale = useLocale();

  useEffect(() => {
    // Update the document's lang and dir attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null; // This component doesn't render anything
}
