import { Text, ScrollView, Link } from '@/components/Themed';
import React from 'react';
import { TextInput } from 'react-native';

export default function SettingsView() {
    return (
        <ScrollView>
            <Text>SettingsView</Text>
            <Link href="/settings/debugScreen">Debug</Link>
        </ScrollView>
    );
}
