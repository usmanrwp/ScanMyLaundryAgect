import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E6EE"

  },
  header: {
    backgroundColor: Colors.header, //'#2f2e34',
  },
  headerContent: {
    paddingBottom: 0,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Raleway-BoldItalic',
    marginVertical: 15,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Raleway-Bold',
  },
  bodyContent: {
    flex: 1,
    backgroundColor: "#E8E6EE"
    //'#2f2e34',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },

  menuBox: {
    flex: 1,
    backgroundColor: Colors.white, //'#20202a',
    width: 'auto',
    height: 80,
    alignItems: 'center',
    // justifyContent: 'center',
    margin: 12,
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
    borderRadius: 20,
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
    paddingRight: 30,
  },
  info: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    paddingHorizontal: 10,
    color: '#446BD6',
  },
  versionContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  versionText: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#446BD6',
  },
});

export default styles;
