import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  Modal,
  PermissionsAndroid
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import _fetch from '../../fetch_function/_fetch';
// import _retrieveData from '../../local_cache/_retrieveData';
import Loader from '../../components/Loader';
import Text from '../../components/CustomText';
import styles from './style';
import Header_ from '../../components/Header';
import { CameraKitCameraScreen } from 'react-native-camera-kit';


export default class index extends Component {
  state = {
    loading: true,
    email: '',
    name: '',
    picture: '',
    description: '11',
    opneScanner: false,
    qrvalue: '',
    data: [
      {
        id: 0,
        Name: 'Profile',
        Picture: require('../../assets/icons/profile.png'),
      },
      {
        id: 1,
        Name: 'Booking',
        Picture: require('../../assets/icons/booking.png'),
      },
      {
        id: 2,
        Name: 'Order Status',
        Picture: require('../../assets/icons/order_status.png'),
      },
      {
        id: 3,
        Name: 'Route',
        Picture: require('../../assets/icons/route.png'),
      },
      // {
      //   id: 4,
      //   Name: 'Read Basket #',
      //   Picture: require('../../Images/search.png'),
      // },
      {
        id: 5,
        Name: 'Register Customer',
        Picture: require('../../Images/edit.png'),
      },
      {
        id: 6,
        Name: 'Assign Basket',
        Picture: require('../../Images/checklist.png'),
      },
      {
        id: 7,
        Name: 'Basket Details',
        Picture: require('../../Images/details.png'),
      },
      // {
      //   id: 4,
      //   Name: 'Payment',
      //   Picture: require('../../assets/icons/payment.png'),
      // },
      {
        id: 8,
        Name: 'Setting',
        Picture: require('../../assets/icons/setting.png'),
      },
    ],
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    BackHandler.exitApp();
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    const email = await _retrieveData();
    await this.setState({
      email,
    });
    this.loadData();
  };

  loadData = async () => {
    const param = {};
    param['email'] = this.state.email;
    // console.warn('param', param);

    const res = await _fetch('read_user_profile', param);
    // console.warn("gggg " + JSON.stringify(res));

    const name = res[0].Name;
    const picture = res[0].Picture;
    console.warn("profileeeeeee " + res[0].Picture);

    // console.warn("jjjj" + JSON.stringify(name) + JSON.stringify(picture));

    this.setState({
      loading: false,
      name,
      picture,
    });
  };



  open_menu = async id => {
    if (id === 0) {
      this.props.navigation.navigate('Profile');
    } else if (id === 1) {
      this.props.navigation.navigate('Booking');
    } else if (id === 2) {
      this.props.navigation.navigate('Order_Status');
    } else if (id === 3) {
      this.props.navigation.navigate('Route');
    }
    // else if (id === 4) {
    //   this.onOpneScanner()

    // }
    // else if (id === 4) {
    //   this.props.navigation.navigate('Payment');
    // } 
    else if (id === 5) {
      this.props.navigation.navigate('RegisterCustomer');
    }
    else if (id === 6) {
      this.props.navigation.navigate('AssignBag');
    }
    else if (id === 7) {
      this.props.navigation.navigate('ReadBagDetails');
    }
    else if (id === 8) {
      this.props.navigation.navigate('Setting');
    }
  };

  onOpneScanner = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "ScanMyLaundry Camera Permission",
            message:
              "ScanMyLaundry App needs access to your camera ",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({ qrvalue: '', scannerCount: "1", opneScanner: true })
          // alert('granted');

        } else {
          alert('CAMERA permission denied');

        }
      } catch (err) {
        console.warn(err);
      }

    } else {
      this.setState({ qrvalue: '', scannerCount: "1", opneScanner: true, })

    }
  }
  onBarcodeScan = async (qrvalue) => {
    this.setState({ scannerCount: "2", opneScanner: false })
    alert(qrvalue)
    // console.log("aaassssaaa", qrvalue)
    // if (qrvalue === "https://qr1.be/LRUT") {
    //   alert("if")
    // } else {
    //   alert("else")
    // }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <NavigationEvents onWillFocus={() => this.componentDidMount()} />
          <View style={styles.header}>
            <ImageBackground
              style={{ width: "100%", resizeMode: 'center', }}
              source={{ uri: this.state.picture }}
            >

              <View style={styles.headerContent}>
                <Header_ title="ScanMyLaundry"
                // round_corner={35}
                />
                <Image style={styles.avatar} source={{ uri: this.state.picture }} />
                <Text style={styles.name}>{this.state.name}</Text>
              </View>
            </ImageBackground>
          </View>

          <FlatList
            style={styles.bodyContent}
            data={this.state.data}
            extraData={this.state.metaData}
            horizontal={false}
            numColumns={2}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={post => {
              const item = post.item;
              return (
                <TouchableOpacity
                  onPress={() => this.open_menu(item.id)}
                  style={styles.menuBox}>
                  <Image
                    style={styles.icon}
                    source={item.Picture}
                    resizeMode="contain"
                  />
                  <Text style={styles.info}>{item.Name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>

        <Modal
          style={{ flex: 1 }}
          animationType="slide"
          transparent={true}
          visible={this.state.opneScanner}
          onRequestClose={() => { this.setState({ opneScanner: false }) }}>
          <View style={styles.modelViewLoc}>

            <View style={{ flex: 1 }}>
              <CameraKitCameraScreen
                showFrame={false}
                // Show/hide scan frame
                scanBarcode={true}
                // Can restrict for the QR Code only
                laserColor={'blue'}
                // Color can be of your choice
                frameColor={'blue'}
                // If frame is visible then frame color
                colorForScannerFrame={'black'}
                // Scanner Frame color
                onReadCode={(event) =>
                  this.onBarcodeScan(event.nativeEvent.codeStringValue)
                }
              />
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}
