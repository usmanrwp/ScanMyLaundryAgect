import Geolocation from '@react-native-community/geolocation';

export default Location = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
        return position;
      },
      error => {
        if (error.message.includes('No location provider available')) {
          resolve('Please Enable Location');
          return 'Please Enable Location';
        } else {
          resolve(error);
          return error;
        }
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  });
};
