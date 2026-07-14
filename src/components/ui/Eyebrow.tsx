import type { ReactNode } from 'react';

interface EyebrowProps {
  index?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

/** Gold index-tick label. Mirrors `.eyebrow.eyebrow--index` from global.css. */
export function Eyebrow({ index, children, id, className = '' }: EyebrowProps) {
  return (
    <p className={`eyebrow ${index !== undefined ? 'eyebrow--index' : ''} ${className}`.trim()} id={id}>
      {index !== undefined && (
        <>
          <span>{index}</span>&nbsp;&nbsp;
        </>
      )}
      {children}
    </p>
  );
}
