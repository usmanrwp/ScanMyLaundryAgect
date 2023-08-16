import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Text from '../../components/CustomText';
import { NavigationEvents } from 'react-navigation';
import _retrieveData from '../../local_cache/_retrieveData';
import _fetch from '../../fetch_function/_fetch';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Header_ from '../../components/Header1';
import Waiting from './Waiting';
import Booked from './Booked';
import Completed from './Completed';

export default class index extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   index: 0,
    //   routes: [
    //     { key: 'first', title: 'Orders', indx: 0 },
    //     { key: 'second', title: 'Processing', indx: 1 },
    //     { key: 'third', title: 'Complete', indx: 2 },
    //   ],
    //   email: null,
    //   selectedItem: 0

    // };
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Orders', indx: 0 },
      { key: 'second', title: 'Processing', indx: 1 },
      { key: 'third', title: 'Complete', indx: 2 },
    ],
    email: null,
    selectedItem: 0

  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    // alert(this.state.selectedItem)

    this.load_data();
    const obj = new Waiting();
    obj.navigate_data(this.props.navigation);
    const obj1 = new Booked();
    obj1.navigate_data(this.props.navigation);
    const obj2 = new Completed();
    obj2.navigate_data(this.props.navigation);
  }

  load_data = async () => {
    const email = await _retrieveData();
    this.setState({
      email,
    });
  };

  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({ selectedItem: index });
    //  alert(index);
  }

  render() {
    return (
      <View style={styles.appContainer}>
        {/* <NavigationEvents onWillFocus={() => this.load_data()} /> */}
        {/* <Header_ left back onBackPress={this.backPressed} title={"Booking"} /> */}

        <Header_ title="Booking" left back onBackPress={this.backPressed} />
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />
        <TabView
          navigationState={this.state}
          tabStyle={styles.tab_Style}
          lazy={true}
          renderTabBar={props => (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
              style={{ borderBottomLeftRadius: 40 }}>
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: "transparent"
                }}
                style={{ backgroundColor: "transparent" }}
                renderLabel={({ route, focused, color }) => (
                  <View
                    style={
                      this.state.selectedItem === route.indx ? {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 30,
                        width: 100,
                        alignItems: "center"
                      } : {
                          alignItems: "center",
                          borderRadius: 30,
                          width: 100,
                        }
                        }>
                    <Text
                      style={{ color: "#F2FBFF", padding: 7, margin: 5, fontSize: 12, fontFamily: "Raleway-BoldItalic" }}>
                      {route.title}
                    </Text>
                  </View>
                )}
              />
            </LinearGradient>
          )}
          style={{ marginTop: 0 }}
          renderScene={SceneMap({
            first: Waiting,
            second: Booked,
            third: Completed
          })}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />

        {/* <TabView
          navigationState={this.state}
          lazy={true}
          style={{ marginTop: 0 }}
          swipeEnabled={true}
          renderScene={SceneMap({
            first: Waiting,
            second: Booked,
            third: Completed,
          })}
          renderTabBar={props => (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
              style={{ borderBottomLeftRadius: 40 }}>
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: "transparent"
                }}
                style={{ backgroundColor: "transparent" }}
                renderLabel={({ route, focused, color }) => (


                  <View 
                  style={
                    this.state.selectedItem === route.indx ? {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 30,
                      width: 100,
                      alignItems: "center"
                  } : {
                    alignItems: "center",

                  }}>
                    <Text
                      style={{color: "#F2FBFF", padding: 7, margin: 5, fontSize: 12,fontFamily: "Raleway-BoldItalic"}}>
                      
                      {route.indx}
                    </Text>
                   </View>


                )}
              />
            </LinearGradient>
          )}
          onIndexChange={this._handleIndexChange}

          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        /> */}
      </View>
    );
  }

  openCamera = async () => {
    const res = await Image_Picker('camera');
    this.setState({ Image_Picker_SelectionModel: false });
    if (res === false || res === 'cancel') {
      return;
    }
    this.uploadImage(this.state.email, res.filename, res.mime, res.data);
    this.setState({
      picture: res.path,
    });
  };

  openGallery = async () => {
    const res = await Image_Picker('gallery');
    this.setState({ Image_Picker_SelectionModel: false });
    if (res === false || res === 'cancel') {
      return;
    }
    this.setState({
      loading: true,
    });
    console.warn('gallery\n', res);
    this.uploadImage(
      this.state.email,
      res.filename,
      res.mime,
      res.data,
      res.path,
    );
  };

  uploadImage = async (email, fileName, imageType, base_64, path) => {
    const res = await _imageUpload(
      'upload_dp',
      email,
      fileName,
      imageType,
      base_64,
    );
    console.warn('Image Upload res==>', res);
    if (res.includes('The file has been uploaded.')) {
      this.setState({
        loading: false,
        picture: path,
      });
    } else {
      alert('Not Upload.');
      this.setState({
        loading: false,
      });
    }
  };
}
