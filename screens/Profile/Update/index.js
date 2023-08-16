import React, { Component } from 'react';
import {
  View,
  ScrollView,
  // TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Platform,
  PermissionsAndroid,
  BackHandler,
  Text,
  TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

import styles from './style';
import Header_ from '../../../components/Header1';
import Toast_ from '../../../functions/Toast_';
import Edit_Text from '../../../components/Edit_Text';
import Cache_Image from '../../../components/Cache_Image';
import CustomButton from '../../../components/CustomButton';
import _fetch from '../../../fetch_function/_fetch';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import _retrieveData from '../../../local_cache/_retrieveData';
import _deleteData from '../../../local_cache/_deleteData';
import TabViewLoader from '../../../components/TabViewLoader';
import Profile from '../index';
import DisableEditText from '../../../components/DisableEditText';
import ButtonPressLoader from '../../../components/ButtonPressLoader';
import LinearGradient from 'react-native-linear-gradient';



let profileThis;
const profile = null;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cp: true,
      cpIcon: 'ios-eye-off',
      name: '',
      email: '',
      mobile: '',
      phone: '',
      address: '',
      postal_code: '',
      error_name: '',
      error_email: '',
      error_mobile: '',
      error_phone: '',
      error_address: '',
      error_postal_code: '',
      mapVisible: false,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      mapRegionCurrent: null,
      latCurrent: null,
      longCurrent: null,
      animateLat: null,
      animateLong: null,
      isMapReady: false,
      loading: true,
      updateLoading: false,
    };
  }

  retrieveEmail = async () => {
    const res = await _retrieveData();

    if (res.includes('Empty_LocalCache')) {
      return 'empty';
    } else {
      this.setState({
        email: res,
      });
      return res;
    }
  };

  componentWillUnmount() { }

  backPressed = () => {
    this.props.navigation.navigate(this.state.backTo);
    return true;
  };

  componentDidMount = async () => {
    const email = await this.retrieveEmail();
    await this.setState({
      email,
    });
    this.loadData();
    if (Platform.OS === 'ios') {
      // your code using Geolocation and asking for authorisation with
      Geolocation.requestAuthorization();
      await this.currentLocation();
    } else {
      const permissionres = await this.getPermission();
      if (permissionres === true) {
        await this.currentLocation();
      }
    }
  };

  currentLocation = async () => {
    this.cLocation();
  };

  cLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        this.setState({
          mapRegionCurrent: region,
          latCurrent: position.coords.latitude,
          longCurrent: position.coords.longitude,
          animateLat: position.coords.latitude,
          animateLong: position.coords.longitude,
        });
        this.onRegionChange(
          region,
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => {
        if (error.message.includes('No location provider available')) {
          Toast_('Please Enable Location');
        }
      },
      { enableHighAccuracy: false, timeout: 20000 },
    );
  };

  nameText = text => {
    let reg = /^(\s*)([a-zA-Z| ]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_name: 'Name is only in English alphabet',
        name: text,
      });
      return false;
    } else {
      const obj = new Profile();
      obj.changeName(text, profileThis);
      this.setState({
        error_name: '',
        name: text,
      });
      return true;
    }
  };

  emailText = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, error_email: 'Invalid' });
      return false;
    } else {
      this.setState({ email: text, error_email: '' });
      return true;
    }
  };

  mobileText = text => {
    let reg = /^(\s*)([0-9]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_mobile: 'Invalid',
        mobile: text,
      });
      return false;
    } else {
      this.setState({
        error_mobile: '',
        mobile: text,
      });
      return true;
    }
  };

  phoneText = text => {
    let reg = /^(\s*)([0-9]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_phone: 'Invalid',
        phone: text,
      });
      return false;
    } else {
      this.setState({
        error_phone: '',
        phone: text,
      });
      return true;
    }
  };

  headerBackPress = () => {
    this.props.navigation.navigate(this.state.backTo);
  };

  modalHeaderSavePress = async () => {
    let region = {
      latitude: this.state.animateLat,
      longitude: this.state.animateLong,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };
    const res = await this.locationDetails(
      this.state.animateLat,
      this.state.animateLong,
    );

    let address = res.results[0].formatted_address;
    console.warn('Componenet', address);

    this.setState({
      lastLat: this.state.animateLat,
      lastLong: this.state.animateLong,
      address,
      mapRegion: region,
      mapVisible: false,
    });
  };

  getPermission() {
    return new Promise(async function (resolve, reject) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        resolve(true);
      } else {
        let grant = null;
        do {
          grant = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'ScanMyLaundry Location Permission',
              message:
                'ScanMyLaundry App needs access to your location ' +
                'so we collect your item.',
              // buttonNeutral: "Ask Me Later",
              // buttonNegative: "Cancel",
              buttonPositive: 'OK',
            },
          );
        } while (!(grant === PermissionsAndroid.RESULTS.GRANTED));
        resolve(true);
      }
    });
  }

  loadData = async () => {
    let param = {};
    param['email'] = this.state.email;

    let res = await _fetch('read_agent_profile', param);
    let name = res[0][0].Name;
    let address = res[0][0].Address;

    let postal_code = '';
    if (res[1][0].zip_code === 'null' || res[1][0].zip_code === null) {
      postal_code = 'NA';
    } else {
      const newPostalCode = res[1];
      for (let i = 0; i < newPostalCode.length; i++) {
        const zip_code = newPostalCode[i].zip_code;
        postal_code = postal_code + zip_code + ', ';
      }
    }
    if (name === 'null' || name === null) {
      name = 'NA';
    }
    if (address === 'null' || address === null) {
      address = 'NA';
    }

    await this.setState({
      name,
      address,
      postal_code,
      phone: res[0][0].Tel,
      mobile: res[0][0].Mobile,
      loading: false,
    });
  };

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
      animateLat: lastLat || this.state.lastLat,
      animateLong: lastLong || this.state.lastLong,
    });
    console.warn('Map REGION:\n', region);
  }

  onMapPress = e => {
    let region = {
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  };

  async animate(e) {
    await this.setState({
      animateLat: e.latitude,
      animateLong: e.longitude,
    });
    const newCoordinate = {
      latitude: e.latitude,
      longitude: e.longitude,
    };

    if (Platform.OS === 'android') {
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    } else {
      const { coordinate } = this.state;
      coordinate.timing(newCoordinate).start();
    }
  }

  gotoCurrentLocation = () => {
    let region = {
      latitude: this.state.latCurrent,
      longitude: this.state.longCurrent,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  locationDetails(latitude, longitude) {
    return new Promise(async function (resolve, rejcet) {
      // Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4"); // use a valid API key
      let url =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4';
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          return responseJson;
        })
        .catch(err => {
          console.log('Location Details==>', err);
          rejcet('error');
          return 'error';
        });
    });
  }

  render() {
    if (this.state.loading) {
      return <TabViewLoader />;
    }
    return (
      <View style={styles.appContainer}>
        {this.mapModal()}

        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.bodyContainer}>

              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Name</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={name => this.nameText(name)}
                  value={this.state.name}
                  numberOfLines={1}
                  style={styles.editTextStylee} />
              </View>
              <Text style={styles.error_}>{this.state.error_name}</Text>


              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Email</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={email => this.emailText(email)}
                  value={this.state.email}
                  numberOfLines={1}
                  keyboardType="email-address"
                  editable={false}
                  style={styles.editTextStylee} />
              </View>
              <Text style={styles.error_}>{this.state.error_email}</Text>


              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Mobile Number</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={mobile => this.mobileText(mobile)}
                  value={this.state.mobile}
                  numberOfLines={1}
                  keyboardType="phone-pad"
                  style={styles.editTextStylee} />
              </View>
              <Text style={styles.error_}>{this.state.error_mobile}</Text>


              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Phone Number</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={phone => this.phoneText(phone)}
                  value={this.state.phone}
                  numberOfLines={1}
                  keyboardType="phone-pad"
                  style={styles.editTextStylee} />
              </View>
              <Text style={styles.error_}>{this.state.error_phone}</Text>

              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Address</Text>
              <View style={styles.editTextContainer}>
                <TouchableOpacity onPress={() => this.setState({ mapVisible: true })}>
                  <TextInput
                    value={this.state.address}
                    style={styles.editTextStylee}
                    editable={false} />
                </TouchableOpacity>
              </View>


              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Postal Code</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  value={this.state.postal_code}
                  editable={false}
                  style={styles.editTextStylee} />
              </View>

              {/* END OF EDIT TEXT */}

              {/* BUTTON START */}

              {this.state.updateLoading ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    alignContent: 'flex-end',
                    top: 20,
                    right: 40,
                  }}>
                  <ButtonPressLoader />
                </View>
              ) : (
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      flexDirection: 'column',
                    }}>
                    <TouchableOpacity onPress={this.signupPress}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}> Update</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  mapModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.mapVisible}
        style={styles.mapModalContainer}
        onRequestClose={() => { this.setState({ mapVisible: false }) }}>
        {this.state.mapVisible === false ? null : (
          <View>
            <View>
              <Header_
                title="Select Address"
                left
                back
                onBackPress={() => this.setState({ mapVisible: false })}
                save
                savePress={this.modalHeaderSavePress}
              />
            </View>
            <View style={styles.mapModalContainer}>
              <MapView
                style={styles.mapModal}
                provider={PROVIDER_GOOGLE}
                region={this.state.mapRegion}
                loadingEnabled={true}
                loadingBackgroundColor="transparent"
                loadingIndicatorColor="#000000"
                cacheEnabled={true}
                onPress={event => this.animate(event.nativeEvent.coordinate)}
                onLayout={this.onMapLayout}>
                {this.state.isMapReady && (
                  <MapView.Marker.Animated
                    coordinate={{
                      latitude: this.state.animateLat || -36.82339,
                      longitude: this.state.animateLong || -73.03569,
                    }}
                  />
                )}
              </MapView>
            </View>
            <View style={styles.show_on_map1}>
              <TouchableOpacity onPress={() => this.gotoCurrentLocation()}>
                <View style={styles.show_on_map_logo_live}>
                  <Cache_Image
                    uri="https://img.icons8.com/metro/208/000000/north-direction.png"
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    );
  };

  signupPress = async () => {
    if (this.state.name === '') {
      this.setState({
        error_name: 'Please enter name',
      });
      return;
    }
    if (this.state.mobile === '') {
      this.setState({
        error_mobile: 'Please enter mobile number',
      });
      return;
    }
    if (this.state.phone === '') {
      this.setState({
        error_phone: 'Please enter phone number',
      });
      return;
    }

    if (!(this.state.error_name === '')) {
      this.setState({
        error_name: 'Please enter valid name',
      });
      return;
    }
    if (!(this.state.error_mobile === '')) {
      this.setState({
        error_mobile: 'Please enter valid mobile number',
      });
      return;
    }
    if (!(this.state.error_phone === '')) {
      this.setState({
        error_mobile: 'Please enter valid phone number',
      });
      return;
    }
    if (!(this.state.error_address === '')) {
      this.setState({
        error_address: 'Please enter Address',
      });
      return;
    }
    this.setState({
      updateLoading: true,
    });
    let param = {};
    param['name'] = this.state.name;
    param['email'] = this.state.email;
    param['phone'] = this.state.phone;
    param['mobile'] = this.state.mobile;
    param['address'] = this.state.address;
    param['latitude'] = this.state.animateLat;
    param['longitude'] = this.state.animateLong;

    const res = await _fetch('add_agent_profile', param);
    console.warn('add_agent_profile', res);

    if (res.includes('Record created successfully')) {
      Toast_('Details updated');
    } else {
      Toast_(res);
    }
    this.setState({
      updateLoading: false,
    });
  };

  navigate_data = pt => {
    profileThis = pt;

    this.componentDidMount();
  };
}
