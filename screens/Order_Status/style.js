import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor:"#E8E6EE"

  },
  boxMain: {
    padding: 20,
    marginTop: 10,
    // marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: Colors.white, //'#171728',
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
    paddingTop: 7,
    // paddingBottom: 10,
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
    flexDirection: "row",
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
    fontSize: 15,
    color: "#545454",
    fontFamily: 'Raleway',
    fontWeight: "bold"

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
  },
  columnText1: {
    fontSize: 17,
    color: "#446BD6",
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
    fontWeight: "bold",
    width: "60%",
    // textAlign:"left"

  },
  columnTextDull: {
    fontSize: 15,
    color: Colors.dullBlack,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
  },
  commentContainer: {
    flexDirection: "row",
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
    // borderTopColor: Colors.border,
    // backgroundColor: 'rgba(68,107,214,0.6)',
    // backgroundColor: 'black',
    marginBottom: 10,
    // marginTop: 5,
    // borderTopWidth: 2,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 7
  },
  buttonContainer: {
    // marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  button: {
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Raleway',
  },
  statusDropDownButtonContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  DropDownContainer: {
    // marginVertical: -10,
    backgroundColor: 'rgba(68,107,214,0.6)',
    borderRadius: 30

  },
  boxMainBottom: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -15,
    // borderRadius:35
  },
  detailContainer: {
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    color: Colors.white,
    textAlign: 'center',
  },
});

export default styles;
