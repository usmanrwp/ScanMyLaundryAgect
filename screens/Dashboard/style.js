import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor,
    backgroundColor: 'rgba(68,107,214,0.6)'

  },
  header: {
    // backgroundColor: Colors.header, //'#2f2e34',

  },
  headerContent: {
    paddingBottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(68,107,214,0.6)'

  },
  avatar: {
    width: 150,
    height: 150,
    paddingTop: 10,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: 12
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Raleway-BoldItalic',
    marginVertical: 15,
    marginBottom: 40
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Raleway-Bold',
  },
  bodyContent: {
    flex: 1,
    backgroundColor: "#fff", //'#2f2e34',
    // backgroundColor: 'rgba(68,107,214,0.6)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -22
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },

  menuBox: {
    flex: 1,
    // backgroundColor: Colors.box, //'#20202a',
    backgroundColor: 'rgba(68,107,214,0.6)',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
    borderRadius: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 18,
    paddingTop: 5,
    fontFamily: 'Raleway-Regular',
    // color: "#696969"
    // color: Colors.textPink_Name,
    color: Colors.black,
  },
});

export default styles;
