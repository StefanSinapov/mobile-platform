import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} {...props} />;
}

type TabList = {
  id: string;
  title: string;
  iconFilled: React.ComponentProps<typeof MaterialIcons>['name'];
  iconOutlined: React.ComponentProps<typeof MaterialIcons>['name'];
}[];

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const tabs: TabList = [
    {
      id: 'home',
      title: 'Home',
      iconFilled: 'home-filled',
      iconOutlined: 'home',
    },
    {
      id: 'search',
      title: 'Search',
      iconFilled: 'search',
      iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: 'Profile',
      iconFilled: 'person',
      iconOutlined: 'person',
    },

    {
      id: 'settings',
      title: 'Settings',
      iconFilled: 'settings',
      iconOutlined: 'settings',
    },
  ];

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        // ...defaultHeaderOptions,
        // tabBarStyle: {
        //   backgroundColor: theme.colors.background,
        //   borderTopColor: theme.colors.muted3,
        //   borderTopWidth: StyleSheet.hairlineWidth,
        // },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      {tabs.map(({ id, title, iconFilled, iconOutlined }) => (
        <Tabs.Screen
          key={title}
          name={id}
          options={{
            title,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name={focused ? iconFilled : iconOutlined} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
