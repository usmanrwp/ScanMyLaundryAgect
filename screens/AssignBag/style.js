import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E6EE"
  },
  editTextStyle: {
    color: Colors.black,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    height:45,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: "#dcdcdc",
    // borderBottomWidth: 1,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    // backgroundColor: '#20202a',
    borderBottomColor: Colors.textColorDull,

    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    width: '85%',
  },
  nameTxt: {
    marginLeft: 35,
    color: '#000',
    fontSize: 13,
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    borderRadius: 23,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 11,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  icon: {
    width: 60,
    height: 60,
  },
  dropdownContainer: {
    width: "90%", color: "#fff", marginTop: 5,
    paddingHorizontal: 0, borderColor: "#446BD6", borderWidth: 1.5, borderTopLeftRadius: 35, borderTopRightRadius: 35,
    borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
},
dropdownLabel: {
    fontSize: 15, textAlign: "center", color: '#000',
},
});

export default styles;
