'use client';

import {useTranslations} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigateTo = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${locale}${path}`);
  };

  return (
    <nav className="bg-white shadow-lg">

            <LanguageSwitcher />

    </nav>
  );
}
