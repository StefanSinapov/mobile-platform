import React from 'react';
import * as Device from 'expo-device';
import { Text, View } from '@/components/Themed';
import { Platform } from 'react-native';

export default function debugScreen() {
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
            }}
        >
            <Text>Platform: {Platform.OS}</Text>
            {Platform.OS !== 'web' && (
                <Text>
                    Device: {Device.manufacturer}, {Device.modelName}, {Device.deviceYearClass}
                </Text>
            )}
            <Text>
                OS: {Device.osName} {Device.osVersion}
            </Text>
            <Text>Device type: {Device.deviceType ? Device.DeviceType[Device.deviceType] : ''}</Text>
            {Platform.OS !== 'web' && (
                <>
                    <Text>OS build ID: {Device.osBuildId}</Text>
                    <Text>
                        OS build: {Device.osBuildFingerprint}, {Device.osInternalBuildId}
                    </Text>
                </>
            )}
        </View>
    );
}
