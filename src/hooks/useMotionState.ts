import { useSyncExternalStore } from 'react';
import {
  getMotionState,
  subscribeMotion,
  type MotionState,
} from '@/lib/motion/MotionConfig';

const SSR_SNAPSHOT: MotionState = {
  reducedMotion: false,
  isTouch: false,
  canHover: true,
  prefersFine: true,
};

/** Live motion capability, re-rendering the component when media queries change. */
export function useMotionState(): MotionState {
  return useSyncExternalStore(subscribeMotion, getMotionState, () => SSR_SNAPSHOT);
}

export function useReducedMotion(): boolean {
  return useMotionState().reducedMotion;
}
