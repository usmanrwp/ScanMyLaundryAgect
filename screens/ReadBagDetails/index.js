import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  TextInput
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
import appImageUrl from '../../urls/appImageUrl'


export default class index extends Component {
  state = {
    email: '',
    bagNo: '',
    password: '',
    NoBagAssign: false,
    name: '',
    picture: ''
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
    await this.setState({ email });
  };

  setValue = (item) => {
    this.setState({ filterRecord: item.value })
  }
  readBagDetails = async () => {
    if (this.state.bagNo === '') {
      alert("Enter basket No")
    } else {
      const param = {};
      param['email'] = this.state.email;
      param['bag_no'] = this.state.bagNo;
      const res = await _fetch('read_bag_details', param);
      if (res === "Bag not assigned!") {
        alert(JSON.stringify(res))
        this.setState({ name: '', picture: '', NoBagAssign: false })
      } else {
        // alert("else "+JSON.stringify(res[0].picture_link))
        this.setState({ name: res[0].Name, picture: res[0].picture_link, NoBagAssign: true })
      }
    }


  }


  render() {
    return (
      <View style={styles.container}>
        <Header_ left back
          title="Basket Details"
          onBackPress={this.backPressed}
          round_corner={35} />
        {/* <ScrollView style={{backgroundColor:"blue"}}>  */}

        <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 10 }}>Basket #</Text>
        <View style={styles.editTextContainer}>
          <TextInput
            onChangeText={bagNo => this.setState({ bagNo })}
            value={this.state.bagNo}
            ref="Email"
            numberOfLines={1}
            style={styles.editTextStyle} />
        </View>

        <TouchableOpacity onPress={this.readBagDetails}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Submit
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {this.state.NoBagAssign &&
          <View>
            <Image
              style={{ height: 140, width: 140, alignSelf: "center", marginTop: 12 }}
              source={{ uri: "https://scanmylaundry.com/api/" + this.state.picture }}
              resizeMode="contain" />
            <Text style={{ color: '#000000', alignSelf: "center", marginTop: 5, fontWeight: "bold" }}>{this.state.name}</Text>
          </View>

        }

        {/* </ScrollView> */}

      </View>
    );
  }
}
