import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor,
    backgroundColor: "#E8E6EE"

  },
  flatListContainer: {
    flexDirection: 'row',
    flex: 1,
    
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingRight: 10,
    color: "#446BD6",

  },
  boxMain: {
    paddingTop:15,
    paddingLeft:15,
    paddingRight: 15,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
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
    width: 70,
    height: 70,
    // borderRadius: 308
    // borderColor: Colors.imageBorder,
    // borderWidth: 3,
  },
  customerNameContainer: {
    alignContent: 'center',
    alignItems: 'center',
    // paddingTop: 10,
    paddingBottom: 5,
  },
  customerNameText: {
    fontSize: 16,
    color: "#446BD6",
    textAlign: 'center',
    paddingBottom: 5,
    fontFamily: 'Raleway-BoldItalic',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor:"white"
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
    fontSize: 13,
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
    fontSize: 14,
    color: Colors.black,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
    fontWeight: "normal",

  },
  columnTextDull: {
    fontSize: 13,
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
    marginTop: 0,
  },
  border: {
    borderTopColor: Colors.header,
    marginBottom: 5,
    marginTop: 3,
    borderTopWidth: 2,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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

  footerMainContainer: {
    // flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  footerContainer: {
    width: '95%',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  footerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
  },
  footerText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Raleway-MediumItalic',
  },
});

export default styles;
