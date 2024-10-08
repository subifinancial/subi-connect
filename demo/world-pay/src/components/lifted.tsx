'use client';

import { useLiftMode } from '@/context/lift-mode';
import { cn } from '@/lib/utils';

const LiftedComponent = ({ children }: { children: React.ReactNode }) => {
  const { liftMode } = useLiftMode();

  return (
    <div
      className={cn(
        'relative border border-transparent rounded-md transition overflow-hidden p-[1.5px]',
        {
          'border-border z-40 -translate-y-0.5 shadow-sm': liftMode,
        },
      )}
    >
      <div
        className={cn({
          'bg-background rounded-sm z-50': liftMode,
        })}
      >
        {children}
      </div>
      <div
        className={cn(
          'animate-rotate hidden absolute -z-10 inset-0 h-full w-full rounded-full bg-[conic-gradient(transparent_0deg,hsl(var(--sc-primary))_120deg,transparent_0deg)]',
          {
            block: liftMode,
          },
        )}
      ></div>
    </div>
  );
};

export default LiftedComponent;
