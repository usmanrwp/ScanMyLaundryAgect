import React, { Component } from 'react';
import { View, ScrollView, BackHandler, TextInput, ImageBackground, TouchableOpacity, } from 'react-native';
import styles from './style';
import Header_ from '../../components/Header';
import Edit_Text from '../../components/Edit_Text';
import Text from '../../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import _fetch from '../../fetch_function/_fetch';
import _deleteData from '../../local_cache/_deleteData';
import _storeData from '../../local_cache/_storeData';
import _retrieveData from '../../local_cache/_retrieveData';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';

import { firebase as fcm } from '@react-native-firebase/messaging';
import ButtonPressLoader from '../../components/ButtonPressLoader';

// console.disableYellowBox = true;

class index extends Component {
  checkPermissions = () => {
    return new Promise((resolve, reject) => {
      fcm
        .messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
            console.warn('enable');
            resolve(true);
          } else {
            // user doesn't have permission
            console.warn('disable');
            this.requestPermissions();
            resolve(false);
          }
        });
    });
  };

  requestPermissions = () => {
    return new Promise((resolve, reject) => {
      fcm
        .messaging()
        .requestPermission()
        .then(() => {
          console.warn('true');
          resolve(true);
        })
        .catch(error => {
          console.warn('false', error);
          resolve(false);
        });
    });
  };
  constructor(props) {
    super(props);

    this.state = {
      cp: true,
      cpIcon: 'ios-eye-off',
      email: '',
      password: '',
      error_email: '',
      loading: true,
      backTo: '',
      loginLoading: false,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    // this.messageListener();
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    // this.messageListener = fcm.messaging().onMessage(message => {
    //   console.warn('message\n', message);

    //   // Process your message as required
    // });
    this.retrieveEmail();
  };

  retrieveEmail = async () => {
    const res = await _retrieveData();
    console.warn(res);

    if (res.includes('Empty_LocalCache')) {
      this.setState({
        loading: false,
        email: '',
      });
    } else {
      // _deleteData();
      // return;
      this.props.navigation.navigate('Dashboard');
    }
  };

  cpPress = () => {
    if (this.state.cp === false) {
      this.setState({
        cp: true,
        cpIcon: 'ios-eye-off',
      });
    } else {
      this.setState({
        cp: false,
        cpIcon: 'ios-eye',
      });
    }
  };

  emailText = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, error_email: 'Invalid Email Address' });
      return false;
    } else {
      this.setState({ email: text, error_email: '' });
      return true;
    }
  };

  passwordText = text => {
    this.setState({
      error_password: '',
      password: text,
    });
  };

  render() {
    /* Email Password Address 1 2 Town County Post Code telephone mobile number  Name */
    if (this.state.loading === true) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        {/* <Header_ title=" Essex Laundry" 
        round_corner={35}
        /> */}
        <ImageBackground source={require('../../Images/laundry.jpg')} style={styles.image_background}>

          <View style={{ backgroundColor: 'rgba(68,107,214,0.7)', flex: 1 }}   >



            <View style={{ flex: 1 }}>


              <View style={{ flex: 1 }}>

                <View style={{ flex: 3 }}>
                  <View style={{ margin: 15 }}>



                  </View>


                </View>


                <View style={{ flex: 1, alignSelf: 'center', }}>







                  <Text style={{ fontSize: 32, color: 'white', fontWeight: "bold", textAlign: 'center' }}>
                    Login
                 </Text>


                </View>



              </View>
            </View>



            <View style={styles.mid_view}>
              <ScrollView>
                <View style={styles.bodyContainer}>
                  <ScrollView>
                    <Text style={styles.input_placeholder}>Email Address</Text>
                    <View style={styles.editTextContainer}>
                      <TextInput
                        value={this.state.email}
                        keyboardType={'email-address'}
                        numberOfLines={1}
                        style={styles.editTextStyle1}
                        onChangeText={email => this.emailText(email)}>
                      </TextInput>
                    </View>

                    <Text style={styles.error_}>{this.state.error_email}</Text>
                    <Text style={styles.input_placeholder}>Password</Text>
                    <View
                      style={[styles.editTextStyle, { flexDirection: "row" }]} >
                      <TextInput
                        style={{ width: "90%" }}
                        value={this.state.password}
                        secureTextEntry={this.state.cp}
                        onChangeText={password => this.passwordText(password)}>
                      </TextInput>
                      <View style={styles.passwordIconContainer}>
                        <Icon
                          name={this.state.cpIcon}
                          size={28}
                          color="#00"
                          onPress={() => this.cpPress()}
                        />
                      </View>
                    </View>
                    <Text style={styles.error_}>{this.state.error_password}</Text>

                    {/* END OF EDIT TEXT */}
                    {this.state.loginLoading ? (
                      <ButtonPressLoader />
                    ) : (
                        <View>
                          {/* BUTTON START */}
                          <TouchableOpacity onPress={this.loginPress}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                              <Text style={styles.buttonText}>
                                Login
                                </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      )}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>

        </ImageBackground>

      </View>
    );
  }

  loginPress = async () => {
    if (this.state.email === '') {
      this.setState({
        error_email: 'Please enter email',
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        error_password: 'Please enter password',
      });
      return;
    }
    if (!(this.state.error_email === '')) {
      this.setState({
        error_email: 'Please enter valid email',
      });
      return;
    }

    let token = null;
    await fcm
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log('FCM TOKEN', fcmToken);
          console.warn('FCM TOKEN', fcmToken);
          token = fcmToken;
        } else {
          // user doesn't have a device token yet
          console.warn('Error');
        }
      })
      .catch(err => {
        console.warn('Error', err);
      });
    this.setState({
      loginLoading: true,
    });
    let param = {};
    param['email'] = this.state.email;
    param['password'] = this.state.password;
    param['firebase_token'] = token;

    const res = await _fetch('login', param);
    console.warn('Login\n', res);
    // alert(JSON.stringify(param));

    if (res.includes('Wrong credentials!')) {
      alert('Wrong credentials!');
    } else if (res.includes('false') || res.includes(false)) {
      alert('Your account is blocked!');
    } else if (res.includes('true') || res.includes(true)) {
      _deleteData('id');
      _storeData(this.state.email);
      this.props.navigation.navigate('Dashboard');
    } else {
      alert(res);
    }
    this.setState({
      loginLoading: false,
    });
  };
}

export default index;
