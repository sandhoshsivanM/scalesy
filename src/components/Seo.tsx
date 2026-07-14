import { Head } from 'vite-react-ssg';
import { asset, SITE_ORIGIN } from '@/lib/paths';

interface SeoProps {
  title: string;
  description: string;
  /** path only, e.g. "/work" — canonical is built from SITE_ORIGIN + base + path */
  path?: string;
  jsonLd?: object;
}

// Per-route head — applied during prerender so meta lands in the static HTML.
export function Seo({ title, description, path = '/', jsonLd }: SeoProps) {
  const ogImage = `${SITE_ORIGIN}${asset('/brand/og-image.jpg')}`;
  const canonical = `${SITE_ORIGIN}${asset(path)}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  );
}
