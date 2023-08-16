import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8E6EE"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  editTextStyle: {
    // width: '90%',

    flex: 1,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  editTextStylee: {
    color: Colors.black,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    height:45,
    paddingLeft: 10
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 25,

    borderRadius: 23,
    //  width: screen_size_width * .9,

  },
  buttonText: {
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  error_: {
    color:"#ff3333",
    fontSize:12,
    marginLeft: 20,
    marginTop: -5,
    alignSelf:"flex-start"
    
    
       
      },
  input_placeholder: {
    color: '#000',
    marginLeft: 30,
    color: 'black',
    // opacity: 0.4,
    marginTop: 5,
    alignSelf:"flex-start"
  },
  editTextStyle1: {
    flex: 1,
    width: '90%',
    padding: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  bodyContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
  },
  mapModalContainer: {
    // flex: 1,
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 5,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  mapModal: {
    height: '100%',
    width: '100%',
  },
  show_on_map1: {
    // backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    bottom: 180,
    right: 14,
    height: 50,
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
  },
  show_on_map_logo_live: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
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
