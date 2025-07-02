'use client';

import { ReactNode } from 'react';

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
  className?: string;
};

export default function FlipCard({
  front,
  back,
  flipped,
  onFlipChange,
  className = '',
}: FlipCardProps) {
  return (
    <div className={`relative [perspective:1200px] w-full ${className}`}>
      <div
        className={`
          relative w-full transition-transform duration-700 [transform-style:preserve-3d]
          ${flipped ? '[transform:rotateY(180deg)]' : ''}
        `}
      >
        {/* Front */}
        <div className="w-full backface-visibility:hidden]">
          {front}
        </div>
        {/* Back */}
        <div className="w-full absolute top-0 left-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
      {/* 提供外部 flip 控制用 */}
      {typeof onFlipChange === 'function' && (
        <input type="hidden" value={flipped ? '1' : '0'} readOnly />
      )}
    </div>
  );
}
