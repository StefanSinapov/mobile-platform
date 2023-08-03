import { ReactNode } from 'react';
import { View } from 'react-native';

export default function Providers({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}

const AppWrapper = ({ children }: { children: ReactNode }) => (
  <View style={{ flex: 1, backgroundColor: 'fff' }}>{children}</View>
);
