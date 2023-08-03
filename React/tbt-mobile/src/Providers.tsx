import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}

const AppWrapper = ({ children }: { children: ReactNode }) => <>{children}</>;
