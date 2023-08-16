import { StyleSheet, Dimensions } from 'react-native';

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 20,

  },
  mid_view: {
    flex: 1.6,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white'
  },
  input_placeholder: {
    color: '#000',
    marginLeft: 30,
    color: 'black',
    opacity: 0.4,
    marginTop: 5
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    borderRadius: 23,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  loginTitle: {
    color: '#000',
    fontSize: 32,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Raleway-BoldItalic',
    textAlign: 'center',
  },
  image_background: {
    flex: 1,
    resizeMode: 'center',
    height: 350,
    // justifyContent: "center"
  },
  passwordContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    marginLeft: 10,
  },
  passwordIconContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  error_: {
    color: "#ff3333",
    fontSize: 12,
    marginLeft: 20,
    marginTop: -5
  },

  editTextStyle: {
    paddingLeft: 10,
    backgroundColor: '#EDEEF0',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    height: 46,
  },

  email_inputfield: {
    flex: 1,
    width: screen_size_width * 0.9,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#EDEEF0',
    borderRadius: 20,

  },
  editTextStyle1: {
    color: "#000000",
    borderBottomColor: "#9e9a9a",
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#EDEEF0',
    borderRadius: 20,
    height: 46,
    paddingLeft: 10
  },

  editTextContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
});

export default styles;
