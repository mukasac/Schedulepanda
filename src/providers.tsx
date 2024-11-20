// src/providers.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from '@/components/theme-provider';
import { SchedulerProvider } from '@/contexts/scheduler-context';
import { DraftsProvider } from '@/contexts/drafts-context';
import { TeamProvider } from '@/contexts/team-context';
import { NotificationProvider } from '@/contexts/notification-context';
import { ModalProvider } from '@/contexts/modal-context';
import { AuthProvider } from '@/contexts/auth-context';
import { SocketProvider } from '@/contexts/socket-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              <TeamProvider>
                <SchedulerProvider>
                  <DraftsProvider>
                    <ModalProvider>
                      <ThemeProvider>
                        {children}
                      </ThemeProvider>
                    </ModalProvider>
                  </DraftsProvider>
                </SchedulerProvider>
              </TeamProvider>
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </NextThemesProvider>
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}