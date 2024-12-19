// src/components/analytics.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect,Suspense } from 'react';
import va from '@vercel/analytics';

export function Analytics() {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ''}`;
    va.track('pageview', { path: url });
  }, [pathname, searchParams]);

  return null;
}

// src/components/tailwind-indicator.tsx
export function TailwindIndicator() {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Suspense>
    <div className="fixed bottom-1 right-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
    </Suspense>
  );
}