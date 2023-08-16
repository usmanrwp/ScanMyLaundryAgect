import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8E6EE",

  },
  boxMain: {
    paddingTop:15,
    paddingLeft:15,
    paddingRight: 1,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: "white", //'#171728',
    flex: 2,
  },
  box: {
    flexDirection: 'row',
  },
  imageNameContainer: {
    flexDirection: 'column',
  },
  image: {
    width: 80,
    height: 80,
    // borderRadius: 50,
    // borderColor: Colors.imageBorder,
    // borderWidth: 3,
  },
  customerNameContainer: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  customerNameText: {
    fontSize: 18,
    color: "#446BD6",
    textAlign: 'center',
    // paddingBottom: 5,
    fontFamily: 'Raleway-BoldItalic',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  mobileCheck_CircleMainContainer: {
    flexDirection: 'column',
  },
  mobileCheck_CircleContainer: {
    flexDirection: 'row',
  },
  boxContentMain: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  columnName: {
    fontSize: 14,
    color: "#545454",
    fontWeight: "bold",
    fontFamily: 'Raleway',
  },
  checkCircle: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: -15,
    justifyContent: 'flex-end',
  },
  columnText: {
    fontSize: 15,
    color: Colors.black,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
    fontWeight: "normal",
  },
  columnTextDull: {
    fontSize: 15,
    color: Colors.dullBlack,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
  },
  commentContainer: {
    flexDirection: 'column',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginRight: -20,
    paddingRight: -20,
    marginTop: 5,
  },
  border: {
    borderTopColor: Colors.header,
    marginBottom: 10,
    marginTop: 5,
    borderTopWidth: 1,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1
  },
  buttonContainer: {
    // marginLeft: 10,
    // flex:1,
    marginRight: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // borderRadius: 10,
  },
  linear_style: {
    borderRadius: 20, padding: 7, paddingLeft: 10, paddingRight: 10, width:"100%", alignItems:"center"
  },
  button: {
    borderRadius: 20, padding: 7, width:"100%", alignItems:"center", width: 70
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Raleway',
    textAlign:"center",
  },
  buttonText1: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Raleway',
    textAlign:"center"
  },

  // acceptModal START
  acceptMainContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",

    height: 'auto',

  },
  acceptContainer: {
    backgroundColor: "#FFF",

    // paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    borderRadius: 10,
    height: null,
    flexDirection: 'column',
    marginBottom: 20
  },
  acceptDateTimeContainer: {
    flexDirection: 'column',
  },
  input_placeholder: {
    color: '#000',
    marginLeft: 30,
    color: 'black',
    opacity: 0.4,
    marginTop: 5
  },
  acceptDateTimeTextTitle: {
    textAlign: 'center',
    padding: 15,
    fontSize: 16,
    color: Colors.textPink_Name,
    fontFamily: 'Raleway',
  },
  editTextStyle: {
    // flex: 1,
    width: '100%',
    borderColor: Colors.white,
  },

  editTextStyle1: {


    width: '90%',

    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  // acceptModal END

  // title: {
  //   fontSize: 18,
  //   color: '#4279dc',
  //   textAlign: 'center',
  //   paddingBottom: 5,
  //   fontFamily: 'Raleway-BoldItalic',
  // },
  // descriptionView: {
  //   marginRight: 20,
  //   // paddingRight:20
  // },
  // descriptionView1: {
  //   marginRight: 0,
  //   // paddingRight:20
  // },
  // descriptionText1: {
  //   fontSize: 15,
  //   color: '#fff',
  //   paddingRight: 10,
  //   marginRight: 0,
  //   fontFamily: 'Raleway',
  // },
  // descriptionText: {
  //   fontSize: 15,
  //   color: '#fff',
  //   paddingRight: 20,
  //   marginRight: 20,
  //   fontFamily: 'Raleway',
  // },
  // description: {},
  // buttons: {
  //   flexDirection: 'row',
  // },
  // button: {
  //   height: 35,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   width: 50,
  //   marginRight: 5,
  //   marginTop: 5,
  // },
  // icon: {
  //   width: 20,
  //   height: 20,
  // },
  // view: {
  //   backgroundColor: '#FF1493',
  // },
  // profile: {
  //   backgroundColor: '#1E90FF',
  // },
  // message: {
  //   backgroundColor: '#228B22',
  // },
});

export default styles;
