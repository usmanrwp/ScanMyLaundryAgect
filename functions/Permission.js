import { PermissionsAndroid } from 'react-native';

export default Permission = () => {
  return new Promise(async function (resolve, reject) {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted) {
      resolve(true);
    } else {
      let grant = null;
      do {
        grant = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ScanMyLaundry Location Permission',
            message:
              'ScanMyLaundry App needs access to your location ' +
              'so we collect your item.',
            // buttonNeutral: "Ask Me Later",
            // buttonNegative: "Cancel",
            buttonPositive: 'OK',
          },
        );
      } while (!(grant === PermissionsAndroid.RESULTS.GRANTED));
      resolve(true);
    }
  });
};
