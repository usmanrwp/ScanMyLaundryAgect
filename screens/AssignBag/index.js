import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import _fetch from '../../fetch_function/_fetch';
import Loader from '../../components/Loader';
import Text from '../../components/CustomText';
import styles from './style';
import Header_ from '../../components/Header1';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

export default class index extends Component {
  state = {
    email: '',
    customerEmail: '',
    password: '',
    name: '',
    picture: '',
    noCustomer: false,
    bagNo:''
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

  setValue = (item) => {
    this.setState({ filterRecord: item.value })
  }

  readCustomerDetails = async () => {
    if (this.state.customerEmail === '') {
      alert("Enter customer Email")
    } else {
      const param = {};
      param['customer_email'] = this.state.customerEmail;
      const res = await _fetch('read_customer_details', param);
      console.log("aaaawwwsss", res[0].picture_link)
      if (res === "Email does not exists!") {
        alert(JSON.stringify(res))
      } else {
        this.setState({ name: res[0].Name, picture: res[0].picture_link, noCustomer: true })
      }
    }


  }
  assignBag = async () => {
    if (this.state.bagNo === '') {
      alert("Enter Bag No")
    } else {
      const param = {};
      param['agent_email'] = this.state.email;
      param['bag_no'] = this.state.bagNo;
      param['customer_email'] = this.state.customerEmail;
      const res = await _fetch('assign_bag_to_customer', param);
      if (res === "Bag assigned successfully!") {
        alert(JSON.stringify(res))
        this.setState({ name: '', picture: '', noCustomer: false , customerEmail:''})
      } 
      else {
      alert(JSON.stringify(res))
      }
    }


  }


  render() {
    return (
      <View style={styles.container}>
        <Header_ left back onBackPress={this.backPressed}
          round_corner={35} title={"Assign Basket"} />
        <ScrollView style={{}}> 

        <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 10 }}>Email</Text>
        <View style={styles.editTextContainer}>
          <TextInput
            onChangeText={customerEmail => this.setState({ customerEmail })}
            value={this.state.customerEmail}
            ref="Email"
            placeholder={"Customer Email"}
            numberOfLines={1}
            style={styles.editTextStyle} />
        </View>

        <TouchableOpacity onPress={this.readCustomerDetails}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Search
                </Text>
          </LinearGradient>
        </TouchableOpacity>

        {this.state.noCustomer &&
          <View>

            <Image
              style={{ height: 140, width: 140, alignSelf: "center", marginTop:12 }}
              source={{ uri: "https://scanmylaundry.com/api/"+this.state.picture}}
              resizeMode="contain" />

            <Text style={{ color: '#000000', alignSelf: "center", marginTop: 1, fontWeight: "bold" }}>{this.state.name}</Text>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 10 }}>Enter Bag #</Text>
            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={bagNo => this.setState({ bagNo })}
                value={this.state.bagNo}
                ref="Email"
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>

            <TouchableOpacity onPress={this.assignBag}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={[styles.linearGradient, { marginTop: 15 }]}>
                <Text style={styles.buttonText}>
                  Assign Bag
                </Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        }


        </ScrollView>

      </View>
    );
  }
}
