import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center text-blue-600">
        {t('title')}
      </h1>
      </section>
    </main>
  );
}
