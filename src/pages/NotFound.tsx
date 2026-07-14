import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <>
      <Seo title="Not found — Scalesy" description="The page you were looking for could not be found." path="/404" />
      <section className="section notfound wrap">
        <Eyebrow index="404">Off the grid</Eyebrow>
        <h1 className="notfound__title">This page isn’t on the map.</h1>
        <p className="notfound__lead text-secondary measure">
          The measurement went off the edge of the plot. Let’s get you back to something solid.
        </p>
        <Link to="/" className="btn notfound__cta">
          Back to home{' '}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
