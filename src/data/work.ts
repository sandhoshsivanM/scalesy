// SCALESY — Selected Work (Tamil Nadu / South India engagements).
// Fictional brands, regionally grounded. Imagery uses hand-picked, muted
// Unsplash placeholders (stable URLs) — swap for real project photography later.
import type { WorkProject } from './types';

export const u = (id: string, w = 1600): string =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const work: WorkProject[] = [
  {
    slug: 'marina-capital',
    outcome: 'A brand composed enough to hold the boardroom.',
    metric: '',
    metricLabel: '',
    name: 'Marina Capital',
    industry: 'Finance & Investment',
    location: 'Chennai',
    year: '2024',
    services: ['Brand Strategy', 'Website Design'],
    image: u('1487958449943-2429e8be8625'),
    featured: true,
    excerpt:
      'A Chennai investment firm that wanted to sound like the room it commands — quiet, exact, and impossible to rush.',
    intro:
      'Marina managed serious capital but spoke like everyone else on the boulevard. We rebuilt the brand around a single idea: composure is the product.',
    sections: [
      {
        heading: 'The problem',
        body: 'Marina’s materials read as competent and forgettable. In a category where trust is the whole transaction, sounding like every other firm on the ECR was a liability the partners could feel but not name.',
      },
      {
        heading: 'What we did',
        body: 'We defined a positioning built on restraint, then expressed it through a spare visual language — one weight of type, one accent, and a great deal of space. The website became a place to think, not a place to sell.',
      },
      {
        heading: 'The outcome',
        body: 'The new identity gave the partners a language they could hold a boardroom with. Marina now leads with clarity where it once led with adjectives.',
      },
    ],
  },
  {
    slug: 'kovai-weaves',
    outcome: 'A house whose story now travels intact — from loom to boutique.',
    metric: '',
    metricLabel: '',
    name: 'Kovai Weaves',
    industry: 'Textiles & Craft',
    location: 'Coimbatore',
    year: '2024',
    services: ['Brand Strategy', 'Content Creation', 'Social Media'],
    image: u('1524758631624-e2822e304c36'),
    featured: true,
    excerpt:
      'A Coimbatore handloom house with three generations of craft and a story that had drifted out of focus.',
    intro:
      'Kovai Weaves had decades of loom-work and no coherent way to tell it. We gave the house a voice as considered as its weave.',
    sections: [
      {
        heading: 'The problem',
        body: 'A new generation in the family business left the brand caught between its archive and its ambition. The showroom, the exports, and the feed each told a slightly different story.',
      },
      {
        heading: 'What we did',
        body: 'We wrote the house narrative first, then let it govern everything downstream — editorial, social, and the rhythm of the seasonal collections. One point of view, expressed patiently.',
      },
      {
        heading: 'The outcome',
        body: 'Kovai’s buyers began to recognise the house before they saw the label. The story now travels intact, from the loom in Coimbatore to a boutique in Chennai.',
      },
    ],
  },
  {
    slug: 'nilgiri-estates',
    outcome: 'Guests arrive already knowing what the brand stands for.',
    metric: '',
    metricLabel: '',
    name: 'Nilgiri Estates',
    industry: 'Hospitality',
    location: 'The Nilgiris',
    year: '2023',
    services: ['Brand Strategy', 'Website Design', 'Creative Campaigns'],
    image: u('1470071459604-3b5ec3a7fe05'),
    featured: true,
    excerpt:
      'A collection of hill-country retreats that needed to feel like one idea, not five listings.',
    intro:
      'Nilgiri Estates had beautiful places and no through-line. We built the connective thinking that turned a portfolio into a brand.',
    sections: [
      {
        heading: 'The problem',
        body: 'Each property above Coonoor had its own look, its own booking flow, and its own idea of the guest. Growth had outpaced coherence.',
      },
      {
        heading: 'What we did',
        body: 'We articulated a single hospitality philosophy drawn from the hills themselves and designed the system that carried it — naming, identity, and a website built around anticipation rather than urgency.',
      },
      {
        heading: 'The outcome',
        body: 'Guests now arrive already knowing what Nilgiri Estates stands for. The brand does the work the discount codes used to.',
      },
    ],
  },
  {
    slug: 'kanchi-silks',
    outcome: 'Growth that compounds — without discounting the weave.',
    metric: '',
    metricLabel: '',
    name: 'Kanchi Silks',
    industry: 'Retail & Heritage',
    location: 'Kanchipuram',
    year: '2023',
    services: ['Performance Marketing', 'Content Creation', 'SEO'],
    image: u('1600585154340-be6161a56a0c'),
    featured: false,
    excerpt:
      'A silk house with a loyal following and a growth ceiling it kept hitting online.',
    intro:
      'Kanchi Silks had the craft and the reputation. What it lacked was a way to sell online that respected both the margin and the heritage.',
    sections: [
      {
        heading: 'The problem',
        body: 'Paid growth was buying orders at a loss, and the digital storefront made a six-yard heirloom look like a commodity. The house was scaling spend faster than it was scaling understanding.',
      },
      {
        heading: 'What we did',
        body: 'We rebuilt acquisition around contribution margin, retired the channels that only looked good in the dashboard, and let content carry the demand that ads had been renting.',
      },
      {
        heading: 'The outcome',
        body: 'Growth slowed, then compounded — this time on foundations the family could stand on, without discounting the weave.',
      },
    ],
  },
  {
    slug: 'chola-health',
    outcome: 'Expertise made legible, credibility kept intact.',
    metric: '',
    metricLabel: '',
    name: 'Chola Health',
    industry: 'Healthcare',
    location: 'Chennai',
    year: '2022',
    services: ['Brand Strategy', 'Website Design'],
    image: u('1486406146926-c627a92ad1ab'),
    featured: false,
    excerpt:
      'A clinical network translating rigour into something patients could actually feel.',
    intro:
      'Chola Health was trusted by specialists and opaque to everyone else. We made the expertise legible without diluting it.',
    sections: [
      {
        heading: 'The problem',
        body: 'The brand spoke fluent clinician and left patients guessing. Across a network stretching from Adyar to Anna Nagar, precision had become a wall.',
      },
      {
        heading: 'What we did',
        body: 'We rebuilt the language and the interface around one principle: clarity is a form of care. Nothing was simplified that shouldn’t be — everything was made plain that could be.',
      },
      {
        heading: 'The outcome',
        body: 'Patients now move through Chola Health with confidence, and the clinicians kept every ounce of their credibility.',
      },
    ],
  },
];

export const featuredWork: WorkProject[] = work.filter((p) => p.featured);
