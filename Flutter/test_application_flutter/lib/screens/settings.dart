import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {

  const SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  String device = '';
  String OS = '';

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('Operation system: ${Platform.operatingSystem}'),
          Text('Device: $device'),
          Text('OS: $OS'),
          const Text('Hot reload is working!'),
        ],
      ),
    );
  }
  
  Future<void> initPlatformState() async {
    if (Platform.isAndroid) {
     var androidInfo = await deviceInfo.androidInfo;
      setState(() {
        device = '${androidInfo.brand} ${androidInfo.model}';
        OS = '${androidInfo.version.release} sdk:${androidInfo.version.sdkInt}';
      });
    } else if (Platform.isIOS) {
      var iosInfo = await deviceInfo.iosInfo;
      setState(() {
        device = iosInfo.utsname.machine;
        OS = iosInfo.systemVersion;
      });
    }
  }
}
