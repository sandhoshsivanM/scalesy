import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { canUseCursor, getMotionState, subscribeMotion } from '@/lib/motion/MotionConfig';

type CursorMode = 'default' | 'view' | 'drag' | 'label' | 'hidden';

interface CursorApi {
  setCursor: (mode: CursorMode, label?: string) => void;
}

const CursorContext = createContext<CursorApi>({ setCursor: () => {} });

export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mode = useRef<CursorMode>('default');

  // Decide (and keep updated) whether the custom cursor should run.
  useEffect(() => {
    const update = () => setEnabled(canUseCursor(getMotionState()));
    update();
    return subscribeMotion(update);
  }, []);

  // Pointer tracking with an interpolated ring (transform-only).
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;

    const render = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        document.documentElement.classList.add('has-cursor');
      }
    };
    const onLeaveWindow = () => {
      visible = false;
      document.documentElement.classList.remove('has-cursor');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeaveWindow);
    raf = requestAnimationFrame(render);
    document.documentElement.classList.add('cursor-active');

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeaveWindow);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-active', 'has-cursor');
    };
  }, [enabled]);

  const setCursor = useCallback(
    (next: CursorMode, label = '') => {
      if (!enabled) return;
      mode.current = next;
      const ring = ringRef.current;
      const lbl = labelRef.current;
      if (ring) ring.dataset.mode = next;
      if (lbl) lbl.textContent = label;
    },
    [enabled],
  );

  return (
    <CursorContext.Provider value={{ setCursor }}>
      {children}
      {enabled && (
        <>
          <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
          <div ref={ringRef} className="cursor-ring" data-mode="default" aria-hidden="true">
            <span ref={labelRef} className="cursor-ring__label" />
          </div>
        </>
      )}
    </CursorContext.Provider>
  );
}

export function useCursor(): CursorApi {
  return useContext(CursorContext);
}
