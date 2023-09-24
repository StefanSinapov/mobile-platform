import { translate } from '@/core';
import { View, Text } from '@/ui';

export default function ProfileScreen() {
  return (
    <View padding="m">
      <Text variant="l">{translate('profile.title')}</Text>
    </View>
  );
}
