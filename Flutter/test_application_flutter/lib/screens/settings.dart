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
  String os = '';

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  Future<void> initPlatformState() async {
    if (Platform.isAndroid) {
      var androidInfo = await deviceInfo.androidInfo;
      setState(() {
        device = '${androidInfo.brand} ${androidInfo.model}';
        os = '${androidInfo.version.release} sdk:${androidInfo.version.sdkInt}';
      });
    } else if (Platform.isIOS) {
      var iosInfo = await deviceInfo.iosInfo;
      setState(() {
        device = iosInfo.utsname.machine;
        os = iosInfo.systemVersion;
      });
    } else if (Platform.isWindows) {
      final windowsInfo = await deviceInfo.windowsInfo;
      setState(() {
        device = windowsInfo.productName;
        os =
            '${windowsInfo.majorVersion}.${windowsInfo.minorVersion} ${windowsInfo.displayVersion}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('Operation system: ${Platform.operatingSystem}'),
          Text('Device: $device'),
          Text('OS: $os'),
        ],
      ),
    );
  }
}
