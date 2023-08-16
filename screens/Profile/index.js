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
import Button_Icon from '../../components/Button_Icon';
import styles from './style';
import Header_ from '../../components/Header1';
import Image_Picker_Selection from '../../components/Image_Picker_Selection';
import Image_Picker from '../../functions/Image_Picker';
import _imageUpload from '../../fetch_function/_imageUpload';
import Loader from '../../components/Loader';
import Update from './Update/index';
import Review from './Review/index';
import RandomString from '../../functions/RandomString';


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Profile', indx: 0 },
        { key: 'second', title: 'Review', indx: 1 },
      ],
      loading: true,
      Image_Picker_SelectionModel: false,
      email: null,
      picture: '',
      name: '',
      selectedItem: 0
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    this.load_data();
    const updateObj = new Update();
    updateObj.navigate_data(this);
  };

  changeName = async (name, ot) => {
    this.setState({
      name,
    });
  };
  changePicture = async (picture, ot) => {
    await ot.setState({
      picture,
    });
  };

  load_data = async () => {
    this.setState({
      loading: false,
    });
    const email = await _retrieveData();
    let param = {};
    param['email'] = email;
    const res = await _fetch('read_user_profile', param);
    let name = res[0].Name;
    let picture = res[0].Picture;
    if (name === 'null' || name === null) {
      name = '';
    }
    if (picture === 'null' || picture === null) {
      picture = '';
    }

    await this.setState({
      name,
      email,
      picture,
    });
  };

  hideModal = () => {
    this.setState({
      Image_Picker_SelectionModel: false,
    });
  };

  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({ selectedItem: index });
    //  alert(index);
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        <Header_ left back onBackPress={this.backPressed} title={"Profile"} />
        <Image_Picker_Selection
          isVisible={this.state.Image_Picker_SelectionModel}
          hideModal={() => this.hideModal()}
          cancel={() => this.hideModal()}
          gallery={() => this.openGallery()}
          camera={() => this.openCamera()}
        />

        <TabView
          navigationState={this.state}
          lazy={true}
          style={{ marginTop: 0 }}
          renderScene={SceneMap({
            first: Update,
            second: Review,
          })}
          renderTabBar={props => (

            <View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                style={{ borderBottomLeftRadius: 40 }}>
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: "transparent" }}
                  style={styles.tabBarContainer}
                  renderLabel={({ route, focused, color }) => (

                    // <Text
                    //   style={this.state.selectedItem === route.indx ? {
                    //     backgroundColor: 'rgba(255,255,255,0.2)',
                    //     width: 100,
                    //     paddingTop: 10,
                    //     paddingBottom: 10,
                    //     borderRadius: 60,
                    //     textAlign: "center",
                    //     paddingHorizontal: 3,
                    //     paddingVertical: 5,
                    //     marginHorizontal: 5,
                    //     marginVertical: 3,
                    //     fontSize: 15,
                    //     fontFamily: 'Raleway-BoldItalic',

                    //   } : {

                    //       width: 100,
                    //       borderRadius: 30,
                    //       textAlign: "center",
                    //       paddingTop: 10,
                    //       paddingBottom: 10,
                    //       paddingHorizontal: 3,
                    //       paddingVertical: 5,
                    //       marginHorizontal: 5,
                    //       marginVertical: 3,
                    //       fontSize: 15,
                    //       fontFamily: 'Raleway-BoldItalic',
                    //     }}>
                    //   {route.title}
                    // </Text>

                    <View
                      style={
                        this.state.selectedItem === route.indx ? {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: 30, width: 100, alignItems: "center"
                        } : {
                            alignItems: "center"
                          }}>
                      <Text
                        style={{ color: "#F2FBFF", padding: 7, margin: 5, fontSize: 12, fontFamily: "Raleway-BoldItalic" }}>
                        {route.title}
                      </Text>
                    </View>
                  )} />

              </LinearGradient>

              <View style={styles.headerContainer}>
                <TouchableOpacity
                  style={styles.profilePictureMainContainer}
                  onPress={() => this.setState({ Image_Picker_SelectionModel: true })}>
                  <View style={styles.profilePictureContainer}>
                    <Image
                      source={{
                        uri: this.state.picture,
                      }}
                      style={styles.profilePicture}
                    />
                  </View>
                  <View style={styles.profilePictureIconContainer}>
                    <Button_Icon
                      size={50}
                      onPress={() =>
                        this.setState({ Image_Picker_SelectionModel: true })
                      }
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.nameBusinessContainer}>
                  <Text style={styles.nameBusiness}>{this.state.name}</Text>
                </View>
              </View>


            </View>

          )}
          // onIndexChange={index => this.setState({ index })}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
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
    let fn = fileName;
    if (fileName === undefined || fileName === 'undefined') {
      let rns = await RandomString();
      fn = rns + '.jpg';
    }

    const res = await _imageUpload('upload_dp', email, fn, imageType, base_64);
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
