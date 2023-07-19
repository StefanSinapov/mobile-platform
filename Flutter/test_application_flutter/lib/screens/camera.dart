import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class CameraPage extends StatefulWidget {
  const CameraPage({Key? key}) : super(key: key);

  @override
  State<CameraPage> createState() => _CameraPageState();
}

class _CameraPageState extends State<CameraPage> {
  String imagePath = '';

  Future<void> pickImageFromGallery() async {
    print('Pick Image from Gallery');
    try {
      final pickedFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);
      if (pickedFile != null) {
        setState(() {
          imagePath = pickedFile.path;
        });
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> takePicture() async {
    try {
      var value = await availableCameras();

      if (!mounted) return;
      final result = await Navigator.push(
          context, MaterialPageRoute(builder: (_) => Camera(cameras: value)));

      if (!mounted) return;

      setState(() {
        imagePath = result.path;
      });
    } on CameraException catch (e) {
      showDialog(
          context: context,
          builder: (context) => AlertDialog(
                title: const Text("Exception Occured"),
                content: Text("${e.description}"),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context, 'OK'),
                    child: const Text('OK'),
                  ),
                ],
              ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          ElevatedButton(
            onPressed: pickImageFromGallery,
            child: const Text('Pick Image from Gallery'),
          ),
          const SizedBox(height: 10),
          ElevatedButton(
            onPressed: takePicture,
            child: const Text('Take from Camera'),
          ),
          const SizedBox(height: 10),
          imagePath != ''
              ? Image.file(
                  File(imagePath),
                  height: 400,
                )
              : const Text('Image will be displayed here:'),
        ],
      ),
    ));
  }
}

class Camera extends StatefulWidget {
  final List<CameraDescription>? cameras;
  const Camera({Key? key, required this.cameras}) : super(key: key);

  @override
  State<Camera> createState() => _CameraState();
}

class _CameraState extends State<Camera> {
  late CameraController _controller;

  bool _isRearCameraSelected = true;

  @override
  initState() {
    super.initState();

    initCamera(widget.cameras![0]);
  }

  void initCamera(CameraDescription cameraDescription) {
    _controller = CameraController(cameraDescription, ResolutionPreset.max);
    _controller.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    }).catchError((Object e) {
      if (e is CameraException) {
        switch (e.code) {
          case 'CameraAccessDenied':
            // Handle access errors here.
            break;
          default:
            // Handle other errors here.
            break;
        }
      }
    });
  }

  Future takePicture() async {
    if (!_controller.value.isInitialized) {
      return null;
    }
    if (_controller.value.isTakingPicture) {
      return null;
    }
    try {
      await _controller.setFlashMode(FlashMode.off);
      XFile picture = await _controller.takePicture();
      // Navigator.push(
      //     context,
      //     MaterialPageRoute(
      //         builder: (context) => PreviewPage(
      //               picture: picture,
      //             )));
      Navigator.pop(context, picture);
    } on CameraException catch (e) {
      debugPrint('Error occured while taking picture: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Stack(children: [
        (_controller.value.isInitialized)
            ? CameraPreview(_controller)
            : Container(
                color: Colors.black,
                child: const Center(child: CircularProgressIndicator())),
        Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: MediaQuery.of(context).size.height * 0.20,
              decoration: const BoxDecoration(
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                  color: Colors.black),
              child:
                  Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
                Expanded(
                    child: IconButton(
                  padding: EdgeInsets.zero,
                  iconSize: 30,
                  icon: Icon(
                      _isRearCameraSelected
                          ? Icons.switch_camera
                          : Icons.switch_camera_outlined,
                      color: Colors.white),
                  onPressed: () {
                    setState(
                        () => _isRearCameraSelected = !_isRearCameraSelected);
                    initCamera(widget.cameras![_isRearCameraSelected ? 0 : 1]);
                  },
                )),
                Expanded(
                    child: IconButton(
                  onPressed: takePicture,
                  iconSize: 50,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                  icon: const Icon(Icons.circle, color: Colors.white),
                )),
                const Spacer(),
              ]),
            )),
      ]),
    ));
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }
}
