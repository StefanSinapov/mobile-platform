import { Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { Text, View } from '../../components/Themed';

export default function CameraScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [takePhoto, setTakePhoto] = useState(false);
    const [status, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef<Camera>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    if (!status?.granted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>We need access to your camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    if (takePhoto) {
        return (
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#666',
                            marginBottom: 40,
                            marginLeft: 20,
                        }}
                        onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}
                    >
                        <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>♻</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#666',
                            marginBottom: 40,
                            marginLeft: 20,
                        }}
                        onPress={async () => {
                            if (cameraRef.current) {
                                let photo = await cameraRef.current.takePictureAsync();
                                setImage(photo.uri);
                                setTakePhoto(false);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 30, padding: 10, color: 'white' }}>📸</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Take a photo!"
                onPress={() => {
                    setTakePhoto(true);
                }}
            />
            <Button title="Pick from camera roll" onPress={pickImage} />

            {image && <Image source={{ uri: image }} style={{ width: 400, height: 400, margin: 20 }} />}
        </View>
    );
}
