import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import styles from './style';
import { Icon, Picker, Form } from 'native-base';

import { NavigationEvents } from 'react-navigation';
import _retrieveData from '../../local_cache/_retrieveData';
import _fetch from '../../fetch_function/_fetch';
import moment from 'moment';
import No_Record from '../../components/No_Record';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Header_ from '../../components/Header1';
import OrderStatusEssex from '../../functions/OrderStatusEssex';
import PickerOrderStatusEssex from '../../functions/PickerOrderStatusEssex';
import NextOrderStatusEssex from '../../functions/NextOrderStatusEssex';
import Toast_ from '../../functions/Toast_';
import Loader from '../../components/Loader';
import ButtonPressLoader from '../../components/ButtonPressLoader';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: false,
      dataSource: [],
      email: '',
      refreshing: true,
      loading: true,
      updateLoading: false,
    };
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    this.load_data();
  };

  load_data = async () => {
    const email = await _retrieveData();
    const param = {};
    param['email'] = email;
    let responseJson = await _fetch('read_orders_status', param); //this.state.dataSource;
    console.log("aaassasdffssddd", responseJson)
    // alert(JSON.stringify(responseJson[5]))
    if (responseJson.length === 0 || responseJson === 'No record') {
      responseJson = 'No record';
    } else {
      for (let i = 0; i < responseJson.length; i++) {
        // const index = responseJson.findIndex(
        //   item => responseJson[i].id === item.id,
        // );

        // let data = responseJson;

        const pickerItems = await PickerOrderStatusEssex(
          responseJson[i].orderstatus,
        );
        const pickerSelectedItem = await NextOrderStatusEssex(
          responseJson[i].orderstatus,
        );

        const currentStatus = await OrderStatusEssex(
          responseJson[i].orderstatus,
        );
        if (i === 2) {
          // alert(JSON.stringify(responseJson[2]))
        }
        responseJson[i].pickerItems = pickerItems;
        responseJson[i].pickerSelectedItem = pickerSelectedItem.orderStatus;
        responseJson[i].currentName = currentStatus.textStatus;
      }
    }

    console.warn('response\n', responseJson);
    console.log('responseeeewe\n', responseJson);


    this.setState({
      email,
      // pickerItems,
      dataSource: responseJson,
      customerDateTime:
        moment(new Date()).format('L') + ' ' + moment(new Date()).format('LT'),
      refreshing: false,
      loading: false,
      updateLoading: false,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        loading: true,
        refreshing: true,
      },
      () => this.load_data(),
    );
  };

  updateStatus = async item => {
    this.setState({
      updateLoading: true,
    });
    const param = {};
    param['email'] = this.state.email;
    param['orderid'] = item.id;
    param['status'] = item.pickerSelectedItem;
    param['order_type'] = item.order_type;

    // alert(JSON.stringify(param))

    // this.setState({updateLoading: false});
    const res = await _fetch('update_orders_status', param);
    if (res === 'Record created successfully') {
      this.load_data();
    } else {
      this.setState({ updateLoading: false });
      Toast_(res);
    }
  };

  onValueChange(data, value) {
    data.pickerSelectedItem = value;
    const index = this.state.dataSource.findIndex(item => data.id === item.id);
    let abcde = this.state.dataSource;
    abcde[index] = data;
    this.setState({ dataSource: abcde, metaData: !this.state.metaData });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    if (this.state.dataSource === 'No record') {
      return (
        <View>
          <Header_
            left
            round_corner={35}
            back
            title={"Order Status"}
            onBackPress={this.backPressed} />
          <No_Record
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}>
            No Record
          </No_Record>
        </View>
      );
    }

    return (
      <View style={styles.appContainer}>
        <Header_
          left
          back
          title={"Order Status"}
          onBackPress={this.backPressed}
          round_corner={35} />
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />

        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.dataSource}
          extraData={this.state.metaData}
          renderItem={service => {
            const item = service.item;

            return (
              <View>
                <View style={styles.boxMain}>
                  <View style={styles.box}>
                    <View style={styles.imageNameContainer}>
                      <Image style={styles.image} source={{ uri: item.picture }} />
                      <View style={styles.customerNameContainer}>
                        <Text style={styles.customerNameText}>
                          {item.Customer_Name.split(' ')[0]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.boxContent}>

                      <View style={styles.mobileCheck_CircleMainContainer}>
                        <View style={styles.mobileCheck_CircleContainer}>
                          <Text style={styles.columnName}>Order No.</Text>
                        </View>
                        <Text style={styles.columnText}>{" " + item.id}</Text>
                      </View>
                      <View style={styles.commentContainer}>
                        <Text style={styles.columnName}>
                          Current Status:
                          <Text style={styles.columnText1}>{' '}
                            {item.currentName}</Text>
                        </Text>

                      </View>

                      <View style={styles.mobileCheck_CircleMainContainer}>
                        <View style={styles.mobileCheck_CircleContainer}>
                          <Text style={styles.columnName}>Mobile Number:</Text>
                        </View>
                        <Text style={styles.columnText}>{" " + item.number}</Text>
                      </View>

                      <View style={styles.commentContainer}>
                        <Text style={styles.columnName}>
                          Comment:
                          <Text style={styles.columnText}>{" " + item.comment}</Text>
                        </Text>
                      </View>

                      <View style={{ width: "100%", flex: 1, justifyContent: "flex-end", }}>
                        <View style={{ marginRight: 7 }}>
                          {item.order_type === "bucket" &&
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                              <Image
                                style={{ width: 30, height: 30, resizeMode: "contain" }}
                                source={require('../../Images/shopping_bag.png')} />
                            </View>
                          }
                        </View>

                      </View>
                    </View>
                  </View>
                  {this.state.updateLoading && item.id === item.id ? (
                    <ButtonPressLoader />
                  ) : (
                    // After Border Start
                    <View>
                      {item.orderstatus === 'dropped' ? null : (
                        <View>
                          <View style={styles.border} />
                          <View style={styles.statusDropDownButtonContainer}>
                            <Form style={styles.DropDownContainer}>
                              <Picker
                                style={{ color: '#fff', placeholderTextColor: '#fff', height: 43, }}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" style={{ position: "absolute", marginLeft: "89%" }} />}
                                selectedValue={item.pickerSelectedItem}
                                onValueChange={this.onValueChange.bind(this, item,)}>
                                {item.pickerItems.map(v => {
                                  return (
                                    <Picker.Item label={v.textStatus}
                                      value={v.orderStatus} />
                                  );
                                })}
                              </Picker>
                            </Form>

                            <View style={styles.buttonMainContainer}>
                              {/* BUTTON Details START */}
                              <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                  onPress={() => this.updateStatus(item)}>
                                  <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.button}
                                    colors={[
                                      Colors.gradient1,
                                      Colors.gradient2,
                                    ]}>
                                    <Text style={styles.buttonText}>Update</Text>
                                  </LinearGradient>
                                </TouchableOpacity>
                              </View>
                              {/* BUTTON Details END */}
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  {/* After Border END */}
                </View>

                <TouchableOpacity
                  style={styles.boxMainBottom}
                  onPress={() =>
                    this.props.navigation.navigate('Order_Details', {
                      item: item,
                    })
                  }>
                  <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.detailContainer}
                    colors={[Colors.gradient1, Colors.gradient2]}>
                    <Text style={styles.detailText}>Order Details</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
