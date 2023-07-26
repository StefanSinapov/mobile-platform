import { Button, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, Link } from '@/components/Themed';
import { router } from 'expo-router';
import { StrictMode } from 'react';

export default function TabTwoScreen() {
    const handleGoToSettings = () => {
        if (Platform.OS === 'web') {
            // debugger
        }
        console.log('debug here');

        router.push('/(tabs)/settings');
    };

    return (
        <StrictMode>
            <View style={styles.container}>
                <Text style={styles.title}>Tab Two</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <EditScreenInfo path="app/(tabs)/two.tsx" />
                <Button title="Go to Settings" onPress={handleGoToSettings} />
                <Link href="/(tabs)/settings">Settings</Link>
            </View>
        </StrictMode>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
