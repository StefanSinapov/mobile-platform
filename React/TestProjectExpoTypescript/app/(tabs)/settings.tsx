import { Appearance, Button, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

import { Text, View } from '../../components/Themed';

export default function CameraScreen() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
        }}>
            <Text>Dark mode: {Appearance.getColorScheme()}</Text>
            <Switch
                value={darkMode}
                onValueChange={(value) => {
                    setDarkMode(value);
                }}
            />
        </View>
    );
}
