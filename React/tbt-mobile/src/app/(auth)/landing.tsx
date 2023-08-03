import React from 'react';

import { View, Text, Link } from '@/components/Themed';

export default function LandingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>LandingScreen</Text>
      <Link href="/(auth)/login" asChild>
        <Text>Login</Text>
      </Link>
      <Link href="/(auth)/register" asChild>
        <Text>Register</Text>
      </Link>
    </View>
  );
}
