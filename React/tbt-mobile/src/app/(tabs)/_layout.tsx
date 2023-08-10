import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

import { translate } from '@/core';
import { useDefaultHeaderOptions, useTheme } from '@/ui';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} {...props} style={{ marginBottom: -3 }} />;
}

type TabList = {
  id: string;
  title: string;
  iconFilled: React.ComponentProps<typeof MaterialIcons>['name'];
  iconOutlined: React.ComponentProps<typeof MaterialIcons>['name'];
}[];

export default function TabsLayout() {
  const { theme } = useTheme();
  const defaultHeaderOptions = useDefaultHeaderOptions();
  const tabs: TabList = [
    {
      id: 'home',
      title: translate('home.title'),
      iconFilled: 'home',
      iconOutlined: 'home',
    },
    {
      id: 'search',
      title: translate('search.title'),
      iconFilled: 'search',
      iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: translate('profile.title'),
      iconFilled: 'person',
      iconOutlined: 'person',
    },

    {
      id: 'settings',
      title: translate('settings.title'),
      iconFilled: 'settings',
      iconOutlined: 'settings',
    },
  ];

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        ...defaultHeaderOptions,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.text,
      }}>
      {tabs.map(({ id, title, iconFilled, iconOutlined }) => (
        <Tabs.Screen
          key={title}
          name={id}
          options={{
            title,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name={focused ? iconFilled : iconOutlined} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
