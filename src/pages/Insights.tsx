import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { TickedRule } from '@/components/ui/TickedRule';
import { InsightsList } from '@/sections/InsightsList';

export default function Insights() {
  return (
    <>
      <Seo
        title="Insights — Scalesy"
        description="A journal on strategy, growth, and craft — arguments for brands that would rather be understood than merely seen."
        path="/insights"
      />
      <header className="page-head wrap">
        <Reveal>
          <Eyebrow index="—">Insights</Eyebrow>
        </Reveal>
        <SplitTextReveal as="h1" className="page-head__title" lines={['Fewer words,', 'meant more.']} />
        <Reveal as="p" className="page-head__lead measure" delay={160}>
          A journal on strategy, growth, and the discipline of doing the thinking first.
        </Reveal>
        <TickedRule className="page-head__rule" />
      </header>
      <InsightsList showHead={false} />
    </>
  );
}
