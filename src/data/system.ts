// SCALESY — "The System": four disciplines, one connected engine.
import type { Discipline } from './types';

export const disciplines: Discipline[] = [
  {
    n: '01',
    key: 'strategy',
    title: 'Strategy',
    tagline: 'The truth before the tactics.',
    body: 'We learn the business before the brand — the economics, the audience, the constraints no one wrote down — then decide what to do, and, harder, what to refuse.',
    caps: ['Positioning', 'Brand architecture', 'Messaging', 'Naming'],
    feeds: 'Sets the brief every other discipline answers to.',
  },
  {
    n: '02',
    key: 'identity',
    title: 'Identity',
    tagline: 'A brand that carries weight.',
    body: 'The visual and verbal system that expresses the strategy with restraint — one weight of type, one accent, a great deal of intent.',
    caps: ['Visual identity', 'Design systems', 'Art direction', 'Guidelines'],
    feeds: 'Gives content and growth a consistent surface to work on.',
  },
  {
    n: '03',
    key: 'content',
    title: 'Content',
    tagline: 'One standard, everywhere.',
    body: 'Words, film, and image made to a single editorial standard, so every touchpoint sounds like the same considered brand.',
    caps: ['Editorial', 'Social', 'Film & photography', 'Campaigns'],
    feeds: 'Fuels distribution with things worth returning to.',
  },
  {
    n: '04',
    key: 'growth',
    title: 'Growth',
    tagline: 'Compounded, deliberately.',
    body: 'Distribution and measurement that turn a brand into momentum you can read — and feed what we learn back into the strategy.',
    caps: ['Performance marketing', 'SEO', 'Analytics', 'Optimisation'],
    feeds: 'Closes the loop — the numbers refine the strategy.',
  },
];
