import { Appearance, Button, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

import { Text, View } from '../../components/Themed';
import * as Device from 'expo-device';

export default function CameraScreen() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View
            style={{
                flex: 1,
                padding: 10,
            }}
        >
            <Text>
                Device: {Device.manufacturer}, {Device.modelName}
            </Text>
            <Text>
                OS: {Device.osName} {Device.osVersion}
            </Text>
            <Text>Device type: {Device.deviceType}</Text>
            <Text>OS build ID: {Device.osBuildId}</Text>
        </View>
    );
}
