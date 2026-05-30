"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { LocaleProvider } from "@/src/lib/i18n";
import { PinnedProvider } from "@/src/hooks/usePinned";
import { SoundProvider } from "@/src/hooks/useSoundEnabled";

const ONE_MINUTE = 60_000;

/**
 * Empilha todos os providers globais: React Query → Locale → Sound → Pinned.
 * O `QueryClient` é instanciado dentro do componente pra que cada SSR-render do
 * Next tenha seu próprio client (evita vazar cache entre requests).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 24 * 60 * ONE_MINUTE,
            gcTime: 7 * 24 * 60 * ONE_MINUTE,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <SoundProvider>
          <PinnedProvider>{children}</PinnedProvider>
        </SoundProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
