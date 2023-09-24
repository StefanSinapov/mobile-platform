import type { ReactNode } from 'react';

import { ThemeProvider } from '@/ui';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppWrapper>
      <ThemeProvider>{children}</ThemeProvider>
    </AppWrapper>
  );
}

const AppWrapper = ({ children }: { children: ReactNode }) => <>{children}</>;
