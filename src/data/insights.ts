// SCALESY — Insights. Thought-leadership journal. Minimal metadata.
import type { Insight } from './types';

export const insights: Insight[] = [
  {
    slug: 'the-cost-of-being-loud',
    title: 'The cost of being loud',
    category: 'Strategy',
    date: '2024-11-18',
    readingTime: '6 min',
    excerpt:
      'Attention is cheap to buy and expensive to keep. A case for brands that earn a second look instead of demanding the first.',
    body: [
      'Most marketing budgets are spent renting attention that evaporates the moment the spend stops. It is a treadmill that feels like growth because the numbers move — impressions, reach, frequency — while the thing that actually compounds, preference, stays exactly where it was.',
      'Volume is a strategy of last resort disguised as ambition. When a brand has nothing distinctive to say, it says the same thing more often and louder. The market learns to tune it out, and the only response available is to spend more. This is not a growth model. It is a subscription to being ignored.',
      'The alternative is slower and harder to defend in a quarterly review. You build something worth returning to. You say less, and mean more of it. You let the work carry weight the media plan used to carry. The brands that do this are quiet in a way that reads, over time, as confidence — and confidence is the one thing you cannot buy on an ad exchange.',
      'The question is not how to be heard above the noise. It is whether you have earned the right to be listened to at all.',
    ],
  },
  {
    slug: 'measure-what-decides',
    title: 'Measure what decides',
    category: 'Growth',
    date: '2024-09-02',
    readingTime: '5 min',
    excerpt:
      'Dashboards are full of numbers that describe the past and change nothing about the future. A shorter list of what to actually watch.',
    body: [
      'A metric is only useful if it changes a decision. Most of what fills a marketing dashboard fails this test — it is measured because it can be, not because anyone would act differently if it moved.',
      'The discipline is subtraction. For every number you track, ask what you would do if it doubled, and what you would do if it halved. If the answer is the same in both directions, the metric is decoration. Remove it. What remains is the small set of measures that actually govern where the next hour and the next dollar should go.',
      'This is uncomfortable, because a shorter list is a more accountable one. It is easy to hide inside a report with forty charts. It is much harder to stand behind three. But three numbers you will act on are worth more than forty you will only admire.',
      'Measurement is not the point. Better decisions are. The metrics are just the shortest path between them.',
    ],
  },
  {
    slug: 'strategy-before-craft',
    title: 'Strategy before craft',
    category: 'Craft',
    date: '2024-06-14',
    readingTime: '7 min',
    excerpt:
      'Beautiful work built on a weak idea is expensive decoration. Why the thinking has to be right before the making begins.',
    body: [
      'It is possible to make something exquisite that accomplishes nothing. We see it constantly — immaculate craft draped over a strategy that was never interrogated, work that photographs well and performs poorly.',
      'Craft is not the opposite of strategy; it is its expression. But the sequence matters. When the thinking comes first, every decision downstream has a reason — this weight of type, this amount of space, this word and not its synonym. When the thinking comes last, craft becomes taste applied to a vacuum, and taste alone cannot tell you whether the work is right, only whether it is pretty.',
      'The most expensive mistake in this business is polishing the wrong idea. The polish hides the flaw for exactly as long as it takes to ship, and not one day longer.',
      'Get the idea right, and craft becomes the easiest part of the work. Get it wrong, and no amount of craft will save you — it will only make the failure more elegant.',
    ],
  },
];
