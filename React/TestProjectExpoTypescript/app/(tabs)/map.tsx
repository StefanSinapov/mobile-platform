import MapView, { LatLng, LongPressEvent, Marker } from 'react-native-maps';
import { ScrollView, Text, View } from '../../components/Themed';
import { useRef, useState } from 'react';
import { StyleSheet, Dimensions, Button, Alert } from 'react-native';

import { LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

type MarkerType = {
    latlng: LatLng;
    title: string;
    description?: string;
};

export default function MapScreen() {
    const office: MarkerType = { title: 'DextraSoft', latlng: { latitude: 42.683381890105764, longitude: 23.35473960346132 } };
    const [showCurrentLocation, setShowCurrentLocation] = useState(false);
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const mapRef = useRef<MapView>(null);

    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const [region, setRegion] = useState({
        latitude: 42.683381890105764,
        longitude: 23.35473960346132,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO,
    });

    const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
    const getCurrentLocation = async () => {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await getCurrentPositionAsync({});
        setUserLocation(location);
        setShowCurrentLocation(true);
        mapRef.current?.animateToRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 * ASPECT_RATIO });
    };
    const animateRandom = () => {
        mapRef.current?.animateToRegion(randomRegion());
    };

    const randomRegion = () => ({
        ...region,
        latitude: region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
        longitude: region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2),
    });

    const addMarker = (e: LongPressEvent) => {
        console.log(e.nativeEvent.coordinate);

        setMarkers([
            ...markers,
            {
                latlng: e.nativeEvent.coordinate,
                title: 'New marker ' + markers.length,
                description: `${e.nativeEvent.coordinate.latitude.toPrecision(7)}, ${e.nativeEvent.coordinate.longitude.toPrecision(7)}`,
            },
        ]);
    };
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text style={{ color: 'gray' }}>Click and hold to add pin</Text>
            <MapView
                showsUserLocation={showCurrentLocation}
                style={{ width: '100%', height: 400 }}
                initialRegion={region}
                ref={mapRef}
                onRegionChange={setRegion}
                onLongPress={addMarker}
            >
                <Marker coordinate={office.latlng} title={office.title}></Marker>
                {markers.map((marker, index) => (
                    <Marker draggable key={index} coordinate={marker.latlng} title={marker.title} description={marker.description} />
                ))}
            </MapView>
            <View style={styles.latlng}>
                <Text>
                    {region.latitude.toPrecision(7)},{region.longitude.toPrecision(7)}
                </Text>
            </View>
            {userLocation && (
                <View style={styles.latlng}>
                    <Text>
                        current location: {userLocation.coords.latitude.toPrecision(7)},{userLocation.coords.longitude.toPrecision(7)}
                    </Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Animate (Region) random" onPress={animateRandom} />
            </View>
            <View
                style={{
                    marginHorizontal: 10,
                }}
            >
                <Button title="Go to office" onPress={() => mapRef.current?.animateCamera({ center: office.latlng })} />
                <Button title="My location" onPress={getCurrentLocation} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    centeredText: { textAlign: 'center' },
});
