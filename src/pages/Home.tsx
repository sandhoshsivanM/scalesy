import { Seo } from '@/components/Seo';
import { SITE_ORIGIN } from '@/lib/paths';
import { asset } from '@/lib/paths';
import { Hero } from '@/sections/Hero';
import { ClientLogos } from '@/sections/ClientLogos';
import { Proof } from '@/sections/Proof';
import { Manifesto } from '@/sections/Manifesto';
import { Studio } from '@/sections/Studio';
import { FeaturedServices } from '@/sections/FeaturedServices';
import { System } from '@/sections/System';
import { SelectedWorkGallery } from '@/sections/SelectedWorkGallery';
import { BrandMoment } from '@/sections/BrandMoment';
import { GrowthFramework } from '@/sections/GrowthFramework';
import { Engagement } from '@/sections/Engagement';
import { InsightsList } from '@/sections/InsightsList';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Scalesy',
  url: `${SITE_ORIGIN}${asset('/')}`,
  logo: `${SITE_ORIGIN}${asset('/brand/scalesy-mark.png')}`,
  slogan: 'Measure. Scale. Grow.',
  description:
    'A branding & marketing studio building brands with precision, strategy, and measurable growth.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  email: 'hello@scalesy.com',
  telephone: '+91-44-4000-1200',
};

export default function Home() {
  return (
    <>
      <Seo
        title="SCALESY — Measure. Scale. Grow."
        description="A branding & marketing studio in Chennai building brands with precision, strategy, and measurable growth."
        path="/"
        jsonLd={orgJsonLd}
      />
      <Hero />
      <ClientLogos />
      <Proof />
      <Manifesto />
      <Studio index="03" />
      <FeaturedServices index="04" />
      <System />
      <SelectedWorkGallery index="05" />
      <BrandMoment />
      <GrowthFramework index="06" />
      <Engagement index="07" />
      <InsightsList index="08" limit={3} />
      <Testimonials />
      <Contact index="10" />
    </>
  );
}
