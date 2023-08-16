import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
  },
  boxMain: {
    padding: 20,
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: Colors.box, //'#171728',
    flex: 2,
  },
  box: {
    flexDirection: 'row',
  },
  imageNameContainer: {
    flexDirection: 'column',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: Colors.imageBorder,
    borderWidth: 3,
  },
  customerNameContainer: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
  customerNameText: {
    fontSize: 16,
    color: '#4279dc',
    textAlign: 'center',
    paddingBottom: 5,
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
    fontSize: 13,
    color: Colors.textPink_Name,
    fontFamily: 'Raleway',
  },
  checkCircle: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: -15,
    justifyContent: 'flex-end',
  },
  columnText: {
    fontSize: 13,
    color: Colors.black,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
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
    borderTopColor: Colors.border,
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
