import { Tabs } from 'expo-router';

type TabList = {
  id: string;
  title: string;
  // iconFilled: IconName;
  // iconOutlined: IconName;
}[];

export default function TabsLayout() {
  //   const colorScheme = useColorScheme();
  //   const theme = useTheme();
  //   const defaultHeaderOptions = useDefaultHeaderOptions();
  const tabs: TabList = [
    {
      id: 'home',
      title: `Home`,
      //   iconFilled: 'homeFilled',
      //   iconOutlined: 'homeOutlined',
    },
    {
      id: 'search',
      title: `Search`,
      //   iconFilled: 'searchThick',
      //   iconOutlined: 'search',
    },

    {
      id: 'profile',
      title: `Profile`,
      //   iconFilled: 'userCicleFilled',
      //   iconOutlined: 'userCicleOutlined',
    },

    {
      id: 'settings',
      title: `Settings`,
      //   iconFilled: 'settingsCogFilled',
      //   iconOutlined: 'settingsCogOutlined',
    },
  ];

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={
        {
          // ...defaultHeaderOptions,
          // tabBarStyle: {
          //   backgroundColor: theme.colors.background,
          //   borderTopColor: theme.colors.muted3,
          //   borderTopWidth: StyleSheet.hairlineWidth,
          // },
        }
      }>
      {tabs.map(({ id, title }) => (
        <Tabs.Screen
          key={title}
          name={id}
          options={{
            title: title,
          }}
        />
      ))}
    </Tabs>
  );
}
