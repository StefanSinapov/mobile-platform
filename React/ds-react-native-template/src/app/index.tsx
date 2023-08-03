import { Link, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function RootPage() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>Loading....</Text>
      <Link href={'/(tabs)/home'}>
        <Text>Home</Text>
      </Link>
      <Link href="/(auth)/landing">
        <Text>Auth</Text>
      </Link>
    </View>
  );
}

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
  },
});
