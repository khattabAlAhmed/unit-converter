import {useTranslations} from 'next-intl';
import HomeHeroSection from '@/components/home-sections/HomeHeroSection';
import HomeAboutSection from '@/components/home-sections/HomeAboutSection';
import HomeServicesSection from '@/components/home-sections/HomeServicesSection';
import ContactSection from '@/components/shared-sections/ContactSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeServicesSection />
      <ContactSection />
    </main>
  );
}
