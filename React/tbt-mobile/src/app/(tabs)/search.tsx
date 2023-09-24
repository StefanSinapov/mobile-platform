import { translate } from '@/core';
import { View, Text } from '@/ui';

export default function SearchScreen() {
  return (
    <View padding="m">
      <Text variant="l">{translate('search.title')}</Text>
    </View>
  );
}
