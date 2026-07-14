// SCALESY — Proof band. Honest "how we're built" figures, NOT fabricated
// performance stats. `count`/`pad`/`suffix` drive the count-up animation.
import type { ProofFigure } from './types';

export const proof: { figures: ProofFigure[] } = {
  figures: [
    { count: 1, pad: 2, label: 'Strategy leads every engagement', sub: 'Thinking before making' },
    { count: 6, pad: 2, label: 'A method, none skipped', sub: 'Discover → Scale' },
    { count: 48, suffix: 'h', label: 'We reply to every enquiry', sub: 'Usually within two working days' },
    { value: '1:1', label: 'A partner on every project', sub: 'One point of contact' },
  ],
};
