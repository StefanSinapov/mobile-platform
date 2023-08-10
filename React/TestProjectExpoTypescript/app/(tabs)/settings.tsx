import { Button, GestureResponderEvent } from 'react-native';

import { Text, View } from '../../components/Themed';
import * as Device from 'expo-device';

export default function CameraScreen() {
    function onButtonPress(event: GestureResponderEvent): void {
        console.log('clicked', event.nativeEvent.target);
    }

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
            <Text>How load</Text>
            <Button onPress={onButtonPress} title="Click me" />
        </View>
    );
}
