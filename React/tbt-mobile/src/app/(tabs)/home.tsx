import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs, router } from 'expo-router';
import { Button, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { translate } from '@/core';
import type { Theme } from '@/ui';
import { useDefaultHeaderOptions, useTheme } from '@/ui';

export default function TabOneScreen() {
  const { theme } = useTheme();
  const screenOptions = useDefaultHeaderOptions();

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          ...screenOptions,
          title: translate('home.title'),
          headerRight: () => modalButton(theme),
        }}
      />
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title="Modal" onPress={() => router.push('/modal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function modalButton(theme: Theme) {
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <MaterialIcons
            name="info"
            size={25}
            color={theme.colors.text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}
