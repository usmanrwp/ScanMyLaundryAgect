import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import _fetch from '../../fetch_function/_fetch';
import Loader from '../../components/Loader';
import Text from '../../components/CustomText';
import styles from './style';
import Header_ from '../../components/Header1';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


export default class index extends Component {
  state = {
    email: '',
    customerEmail: '',
    password: '',
    Name: '',
    Mobile: '',
    lat: '',
    long: '',
    postal_code: '',
    loading:false
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    const email = await _retrieveData();
    await this.setState({
      email,
    });
  };

  place_get = async (value) => {
    this.setState({ address1: value })
    value = value.replace(/\s\s+/g, ' ').trim();
    const url =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      value +
      '&key=AIzaSyA74q6YTHVs6EtoPqJKqSOCgbciOi28dPA';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let r = responseJson.predictions;
        this.setState({ data1: r });
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.location_select(item)}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  location_select = async item => {
    const place_id = item.place_id;
    this.setState({ address1: item.description });
    const url =
      'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
      place_id +
      '&key=AIzaSyA74q6YTHVs6EtoPqJKqSOCgbciOi28dPA';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson))
        const lat = responseJson.result.geometry.location.lat;
        const lng = responseJson.result.geometry.location.lng;
        this.setLocationDetail(responseJson.result.geometry.location.lat, responseJson.result.geometry.location.lng);
      })
      .catch(error => {
        console.error(error);
      });
  };

  setLocationDetail = async (latitude, longitude) => {
    const res = await this.locationDetails(latitude, longitude);
    this.setState({ lat: latitude, long: longitude })
    let address = "false";
    let town = "false";
    let county = "false";
    let postal_code = "false";
    let house_noo = "false";

    let location = res;

    // console.warn("qwqwqwqw " + JSON.stringify(res));
    location.results[0].address_components.forEach(component => {
      if (component.types.indexOf("administrative_area_level_2") !== -1) {
        county = component.long_name;
      }

      if (component.types.indexOf("postal_code") !== -1) {
        postal_code = component.long_name;
      }

      if (component.types.indexOf("sublocality_level_1") !== -1) {
        town = component.long_name;
      }

      if (component.types.indexOf("route") !== -1) {
        address = component.long_name;
      }
    });
    // console.warn("qwqwqwqw " + JSON.stringify(res.results[0].address_components[0].long_name));
    house_noo = res.results[0].address_components[0].long_name;

    // if (!(house_noo === "false")) {
    //   this.setState({
    //     house_no: house_noo
    //   });
    // }

    // if (!(address === "false")) {
    //   this.setState({
    //     address1: address
    //   });
    // } else if (!(town === "false")) {
    //   this.setState({
    //     address1: town
    //   });
    // } else if (!(county === "false")) {
    //   this.setState({
    //     address1: county
    //   });
    // }
    // if (!(town === "false")) {
    //   this.setState({
    //     address2: town + " " + county
    //   });
    // } else if (!(county === "false")) {
    //   this.setState({
    //     address2: county
    //   });
    // }
    this.setState({
      postal_code
    });
    // if (this.state.address1 === "false") {
    //   this.setState({
    //     address1: "NA"
    //   });
    // }
    // if (this.state.address2 === "false") {
    //   this.setState({
    //     address2: ""
    //   });
    // }
    if (this.state.postal_code === "false") {
      this.setState({
        postal_code: "NA"
      });
    }
    this.setState({ data1: '' })

  };

  locationDetails(latitude, longitude) {
    return new Promise(async function (resolve, rejcet) {
      // Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4"); // use a valid API key
      let url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        latitude +
        "," +
        longitude +
        "&sensor=true&key=AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4";
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          return responseJson;
        })
        .catch(err => {
          console.log("Location Details==>", err);
          rejcet("error");
          return "error";
        });
    });
  }

  registerCustomer = async () => {
    if (this.state.customerEmail === '') {
      alert("Please Enter Email")
    }
    else if (this.state.password === '') {
      alert("Please Enter Password")
    }
    else if (this.state.Name === '') {
      alert("Please Enter Name")
    }
    else if (this.state.Mobile === '') {
      alert("Please Enter Mobile Number")
    }
    else if (this.state.lat === '') {
      alert("Please Enter Valid Address")
    }
    else {
      this.setState({loading : true})
      const param = {};
      param['email'] = this.state.customerEmail;
      param['password'] = this.state.password;
      param['name'] = this.state.Name;
      param['address'] = this.state.address1;
      param['postal_code'] = this.state.postal_code;
      param['latitude'] = this.state.lat;
      param['longitude'] = this.state.long;
      param['mob'] = this.state.Mobile;
      const res = await _fetch('register_customer_by_agent', param);
      this.setState({loading : false})
      if (res === "Customer account created successfully") {
        alert(JSON.stringify(res))
        this.setState({ customerEmail: '', password: '', Name: false , address1:'',
        postal_code: '', lat: '', long: '' , Mobile:'',})
      } 
      else {
      alert(JSON.stringify(res))
      }
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <Header_ title={"Register Customer"} left back onBackPress={this.backPressed}
          round_corner={35} />
        <ScrollView>

          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 10 }}>Email</Text>
          <View style={styles.editTextContainer}>
            <TextInput
              onChangeText={customerEmail => this.setState({ customerEmail })}
              value={this.state.customerEmail}
              ref="Email"
              keyboardType={'email-address'}
              numberOfLines={1}
              style={styles.editTextStyle} />
          </View>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Name</Text>
          <View style={styles.editTextContainer}>
            <TextInput
              onChangeText={Name => this.setState({ Name })}
              value={this.state.Name}
              ref="Password"
              numberOfLines={1}
              style={styles.editTextStyle} />
          </View>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Mobile</Text>
          <View style={styles.editTextContainer}>
            <TextInput
              onChangeText={Mobile => this.setState({ Mobile })}
              value={this.state.Mobile}
              ref="Password"
              numberOfLines={1}
              keyboardType={'phone-pad'}
              style={styles.editTextStyle} />
          </View>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Password</Text>
          <View style={styles.editTextContainer}>
            <TextInput
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              ref="Password"
              numberOfLines={1}
              secureTextEntry={true}
              style={styles.editTextStyle} />
          </View>
          <View>
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Address</Text>
            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={address1 => this.place_get(address1)}
                value={this.state.address1}
                ref="address1"
                numberOfLines={1}
                style={styles.editTextStyle} />
              <FlatList
                extraData={this.state}
                data={this.state.data1}
                extraData={this.state.metaData}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={this.renderItem} />

            </View>
          </View>

          <TouchableOpacity onPress={this.registerCustomer}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Register
                </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
        {this.state.loading &&
          <ActivityIndicator style={ styles.loading } size="large" color="#446BD6" />
        }
      </View>
    );
  }
}
