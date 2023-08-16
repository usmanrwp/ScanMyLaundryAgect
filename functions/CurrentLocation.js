import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import Location from './Location';
import Permission from './Permission';

export default CurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      // your code using Geolocation and asking for authorisation with
      Geolocation.requestAuthorization();
      const res = await Location();

      resolve(res);
      return res;
    } else {
      const permissionres = await Permission();

      if (permissionres === true) {
        const res = await Location();
        resolve(res);
        return res;
      }
    }
  });
};
