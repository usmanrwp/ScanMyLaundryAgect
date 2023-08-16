import ImagePicker from 'react-native-image-crop-picker';

export default Image_Picker = type => {
  return new Promise(async function(resolve, reject) {
    if (type.toLowerCase() === 'gallery') {
      //start of gallery
      ImagePicker.openPicker({
        width: 250,
        height: 250,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.7,
        compressImageMaxWidth: 250,
        compressImageMaxHeight: 250,
        includeBase64: true,
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true,
      })
        .then(image => {
          resolve(image);
        })
        .catch(err => {
          let a = err.toString().toLowerCase();
          if (a.includes('error: user cancelled image selection'))
            resolve('cancel');
        });
    } //end of gallery

    //start of camera
    else if (type.toLowerCase() === 'camera') {
      ImagePicker.openCamera({
        width: 250,
        height: 250,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.7,
        compressImageMaxWidth: 250,
        compressImageMaxHeight: 250,
        useFrontCamera: true,
        includeBase64: true,
        freeStyleCropEnabled: true,
        cropperCircleOverlay: true,
      })
        .then(image => {
          resolve(image);
        })
        .catch(err => {
          let a = err.toString().toLowerCase();
          if (a.includes('error: user cancelled image selection'))
            resolve('cancel');
        });
    } //end of camera
    else {
      resolve(false);
    }
  });
};
