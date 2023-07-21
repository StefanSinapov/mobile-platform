import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {
  const MapPage({Key? key}) : super(key: key);

  @override
  createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  late GoogleMapController mapController;
  LatLng? _cameraPosition;
  LatLng? _myPosition;

  final Marker _office = const Marker(
      markerId: MarkerId("offce"),
      position: LatLng(42.68346616830684, 23.35478659057842),
      infoWindow: InfoWindow(title: 'DextraSoft'));
  final List<Marker> _markers = [];

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    setState(() {
      _cameraPosition = _office.position;
      _markers.add(_office);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Column(
          children: [
            const Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text('Click and hold to add pin'),
              ],
            ),
            SizedBox(
              height: 500.0,
              child: GoogleMap(
                  onMapCreated: _onMapCreated,
                  onLongPress: _addMarker,
                  myLocationEnabled: true,
                  myLocationButtonEnabled: false,
                  onCameraMove: _onCameraMove,
                  initialCameraPosition: const CameraPosition(
                    target: LatLng(42.68346616830684, 23.35478659057842),
                    zoom: 10,
                  ),
                  markers: _markers.toSet()),
            ),
            const SizedBox(height: 10),
            Text(
                'Camera position: ${_cameraPosition == null ? 'null' : _latLngToString(_cameraPosition!)}'),
            Text(
                'Current position: ${_myPosition == null ? 'null' : _latLngToString(_myPosition!)}'),
            ElevatedButton(
              onPressed: _goToOffice,
              child: const Text('Go to office'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _goToCurrentPosition,
              child: const Text('My location'),
            ),
          ],
        ),
      ),
    );
  }

  void _onCameraMove(position) => {
        setState(() {
          _cameraPosition = position.target;
        })
      };

  void _goToOffice() {
    mapController.animateCamera(CameraUpdate.newLatLng(_office.position));
  }

  String _latLngToString(LatLng argument) {
    return '${argument.latitude.toStringAsPrecision(7)}, ${argument.longitude.toStringAsPrecision(7)}';
  }

  void _addMarker(LatLng argument) {
    setState(() {
      _markers.add(Marker(
        markerId: MarkerId(argument.toString()),
        position: argument,
        infoWindow: InfoWindow(
            title: 'Marker ${_markers.length}',
            snippet: _latLngToString(argument)),
        draggable: true,
      ));
    });
  }

  Future<void> _goToCurrentPosition() async {
    try {
      var position = await _determinePosition();
      setState(() {
        _myPosition = LatLng(position.latitude, position.longitude);
      });

      mapController.animateCamera(CameraUpdate.newLatLng(
          LatLng(position.latitude, position.longitude)));
    } on Exception catch (e) {
      debugPrint(e.toString());
    }
  }

  /// Determine the current position of the device.
  ///
  /// When the location services are not enabled or permissions
  /// are denied the `Future` will return an error.
  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled don't continue
      // accessing the position and request users of the
      // App to enable the location services.
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied, next time you could try
        // requesting permissions again (this is also where
        // Android's shouldShowRequestPermissionRationale
        // returned true. According to Android guidelines
        // your App should show an explanatory UI now.
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    // When we reach here, permissions are granted and we can
    // continue accessing the position of the device.
    return await Geolocator.getCurrentPosition();
  }
}
