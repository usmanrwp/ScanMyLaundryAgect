import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, TextInput, TextInputBase } from 'react-native';
import styles from './style';
import RNModal from 'react-native-modal';
import { NavigationEvents } from 'react-navigation';
import _retrieveData from '../../../local_cache/_retrieveData';
import _fetch from '../../../fetch_function/_fetch';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import No_Record from '../../../components/No_Record';
import Toast_ from '../../../functions/Toast_';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';
import Edit_Text from '../../../components/Edit_Text';
import Sure_Modal from '../../../components/Sure_Modal';
import TabViewLoader from '../../../components/TabViewLoader';
import ButtonPressLoader from '../../../components/ButtonPressLoader';

let order_id = 0;
let move = "";


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: 1,
          picture: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          Customer_Name: 'Nouman',
          category: 'Category',
          check: true,
          number: '030012345678',
          comment: 'NA',
        },
      ],
      email: '',
      isDateTimePickerVisible: false,
      refreshing: true,
      acceptModalVisible: false,
      customerDateTime: '',
      desireDateTime: '',
      deleteVisible: false,
      loading: true,
      price: '',
      comment: '',
      error_price: '',
      error_comment: '',
      okLoading: false,
      order_type: '',
      order_idd: ''
    };
  }

  priceText = text => {
    let reg = /^(\s*)[0-9]*(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_price: 'Price is invalid',
      });
      return false;
    } else {
      this.setState({
        error_price: '',
        price: text,
      });
      return true;
    }
  };

  commentText = text => {
    this.setState({
      comment: text,
    });
  };

  async componentDidMount() {
    this.load_data();
  }

  load_data = async () => {
    const email = await _retrieveData();
    const param = {};
    param['email'] = email;
    const res = await _fetch('read_agent_job', param);
    console.log('read_agent_job active', res[0]);
    if (res[0].length === 0 || res[0].length === '0') {
      res[0] = 'No record';
    }
    // alert(JSON.stringify(res[0][0]))
    this.setState({
      email,
      dataSource: res[0], //'No record',
      customerDateTime:
        moment(new Date()).format('L') + ' ' + moment(new Date()).format('LT'),
      desireDateTime:
        moment(new Date()).format('L') + ' ' + moment(new Date()).format('LT'),
      refreshing: false,
      loading: false,
      okLoading: false,
    });
  };

  applyButton = (orderid, order_typee) => {
    order_id = orderid;
    this.setState({
      price: '100',
      comment: 'NA',
      order_type: order_typee,
      order_idd: orderid

    });
    // this.setAcceptModalVisible();
    setTimeout(() => {
      this.acceptOK();
    }, 1000);
    // this.acceptOK;
  };

  setAcceptModalVisible = () => {
    this.setState({
      acceptModalVisible: !this.state.acceptModalVisible,
    });
  };

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = async (event, date) => {
    const given = new Date(date).getTime();
    const now = new Date().getTime();
    if (given < now) {
      console.warn('OLD');

      Toast_('Cannot select past time');
      this._hideDateTimePicker();
      return;
    }

    await this.setState({
      desireDateTime:
        moment(date).format('L') + ' ' + moment(date).format('LT'),
    });
    console.warn('desireDateTime', this.state.desireDateTime);

    this._hideDateTimePicker();
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.load_data(),
    );
  };

  hideDeleteVisible = () => {
    this.setState({
      deleteVisible: false,
    });
  };

  yesDeleteVisible = () => {
    this.setState({
      deleteVisible: false,
    });
  };

  render() {
    if (this.state.loading) {
      return <TabViewLoader />;
    }
    if (this.state.dataSource === 'No record') {
      return (
        <No_Record
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}>
          No Record
        </No_Record>
      );
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />

        {/* acceptModal START */}
        {this.acceptModal()}
        {/* acceptModal END */}

        {/* deleteVisible START */}
        <Sure_Modal
          text="Are you sure to delete?"
          isVisible={this.state.deleteVisible}
          hideModal={() => this.hideDeleteVisible()}
          cancel={() => this.hideDeleteVisible()}
          yes={() => this.yesDeleteVisible()}
          no={() => this.hideDeleteVisible()}
        />
        {/* deleteVisible END */}

        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.dataSource}
          renderItem={service => {
            const item = service.item;

            return (
              <View style={styles.boxMain}>
                <View style={styles.box}>
                  <View style={styles.imageNameContainer}>
                    <Image style={styles.image} source={{ uri: item.picture }} />
                    <View style={[styles.customerNameContainer, {}]}>
                      <Text style={styles.customerNameText}>
                        {item.Customer_Name.split(' ')[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.boxContent, {}]}>
                    <View style={styles.mobileCheck_CircleMainContainer}>
                      <View style={styles.mobileCheck_CircleContainer}>
                        <Text style={styles.columnName}>Order No. </Text>
                        <Text style={styles.columnText}>{item.id}</Text>

                      </View>
                      <View style={styles.mobileCheck_CircleContainer}>
                        <Text style={styles.columnName}>Mobile Number: </Text>
                        <Text style={styles.columnText}>{item.number}</Text>

                      </View>

                    </View>

                    <View style={styles.commentContainer}>

                      <Text style={styles.columnName}>
                        Comment:
                        <Text style={styles.columnText}>{" " + item.notes}</Text>
                      </Text>
                    </View>

                    <View style={{ width: "100%", flex: 1, justifyContent: "flex-end", }}>
                      <View style={{ marginRight: 7 }}>
                        {item.order_type === "bucket" &&
                          <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Image
                              style={{ width: 30, height: 30, resizeMode: "contain" }}
                              source={require('../../../Images/shopping_bag.png')} />
                          </View>
                        }
                      </View>
                      {item.payment_status === "true" ?
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                          style={[styles.linear_style, { width: 90, marginBottom: 5, alignSelf: "flex-end", marginRight: 4, paddingVertical: 4 }]}>
                          <TouchableOpacity>
                            <Text style={styles.buttonText}>Paid</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                        :
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                          style={[styles.linear_style, { width: 90, marginBottom: 5, alignSelf: "flex-end", marginRight: 4, paddingVertical: 4 }]}>
                          <TouchableOpacity>
                            <Text style={styles.buttonText}>Not Paid</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      }

                    </View>

                  </View>
                </View>

                <View style={[styles.dateTimeContainer, {}]}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.columnTextDull, { paddingRight: 0, marginRight: 0, }]}>Collection Date: </Text>
                    <Text style={styles.columnTextDull}>
                      {item.date.split(' ')[0]}{' '}
                    </Text>
                  </View>


                  <View style={styles.timeContainer}>
                    <Text style={styles.columnTextDull}>
                      {item.date.split(' ')[1]}{' '}
                    </Text>
                  </View>
                </View>

                <View style={styles.border} />

                <View style={styles.buttonMainContainer}>
                  {/* BUTTON Details START */}
                  <View style={styles.buttonContainer}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                      style={styles.linear_style}>

                      <TouchableOpacity onPress={() => move.navigate('Order_Details', {
                        item: item
                      })}>

                        <Text style={styles.buttonText}>Details</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                  </View>
                  {/* BUTTON Details END */}

                  {/* BUTTON Accept START */}

                  {item.payment_status === "true" ?
                    <View style={styles.buttonContainer}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                        style={styles.linear_style}>
                        <TouchableOpacity onPress={() => this.applyButton(item.id, item.order_type)}>
                          <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                    :
                    <View style={styles.buttonContainer}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#787878', '#787878', '#787878']}
                        style={styles.linear_style}>
                        <TouchableOpacity activeOpacity={0.8}>
                          <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  }


                  {/* BUTTON Accept END */}

                  {/* BUTTON Delete START */}
                  <View style={styles.buttonContainer}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                      style={styles.linear_style}>
                      <TouchableOpacity
                        onPress={() => this.setState({ deleteVisible: true })}>

                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                  </View>
                  {/* BUTTON Delete END */}
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }

  acceptModal = () => {
    return (
      <RNModal
        isVisible={this.state.acceptModalVisible}
        onBackButtonPress={this.setAcceptModalVisible}
        onBackdropPress={this.setAcceptModalVisible}
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={1}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View style={styles.acceptMainContainer}>
          <View style={styles.acceptContainer}>
            <Edit_Text
              labelText="Customer Date"
              value={this.state.customerDateTime}
              disabled={true}
              editable={false}
              multiline={true}
              onChangeText={() => { }}
              error={this.state.error_mobile}
            />

            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={{ color: '#B3AFAF', paddingTop: 15 }}>
                Enter your Date
              </Text>
              {this.state.desireDateTime === '' ? null : (
                <Text style={{ color: '#B3AFAF', paddingTop: 10 }}>
                  {this.state.desireDateTime}
                </Text>
              )}
              <View
                style={{
                  borderTopColor: '#B3AFAF',
                  marginTop: 10,
                  borderTopWidth: 0.5,
                }}
              />
            </TouchableOpacity>
            {this.state.isDateTimePickerVisible && (
              <View style={styles.acceptDateTimeContainer}>
                <Text style={styles.acceptDateTimeTextTitle}>
                  Select your desire Date {'&'} Time
                </Text>
                <DateTimePicker
                  mode="datetime"
                  value={new Date()}
                  is24Hour={false}
                  minimumDate={new Date()}
                  onChange={this._handleDatePicked}
                />
              </View>
            )}
            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="Enter Price"
                value={this.state.price}
                multiline={true}
                keyboardType="phone-pad"
                onChangeText={price => this.priceText(price)}
                error={this.state.error_price}
              />
            </View>

            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="Enter Comment (Optional)"
                value={this.state.comment}
                multiline={true}
                // keyboardType="phone-pad"
                onChangeText={comment => this.commentText(comment)}
                error={this.state.error_comment}
              />
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 12 }}>
              {/* BUTTON OK START */}
              {this.state.okLoading ? (
                <ButtonPressLoader />
              ) : (
                <TouchableOpacity onPress={this.acceptOK}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                    style={{ borderRadius: 20, width: 70, padding: 8 }}>

                    <Text style={styles.buttonText1}>OK</Text>
                  </LinearGradient>
                </TouchableOpacity>)}
              {/* BUTTON OK END */}

              {/* BUTTON Cancel START */}


              <TouchableOpacity onPress={this.acceptCancel}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                  style={{ borderRadius: 20, width: 70, padding: 8, marginLeft: 12 }}>

                  <Text style={styles.buttonText1}>Cancel</Text>
                </LinearGradient>

              </TouchableOpacity>
              {/* BUTTON Cancel END */}
            </View>
          </View>
        </View>
      </RNModal >
    );
  };

  acceptCancel = () => {
    this.setAcceptModalVisible();
  };
  acceptOK = async () => {
    // if (!(this.state.error_price === '')) {
    //   this.setState({
    //     price: '',
    //     error_price: 'Price is invalid',
    //   });
    //   return;
    // }
    // if (this.state.price === '') {
    //   this.setState({
    //     price: '',
    //     error_price: 'Please enter price',
    //   });
    //   return;
    // }

    // this.setState({
    //   okLoading: true,
    // });
    this.setState({
      refreshing: true,
    });
    let param = {};
    param['email'] = this.state.email;
    param['order_id'] = this.state.order_idd;
    param['work_price'] = this.state.price;
    // param['work_price'] = "100";
    param['comment'] = this.state.comment;
    // param['comment'] = "NA";
    param['agent_date_offer'] = this.state.desireDateTime;
    param['order_type'] = this.state.order_type;
    console.warn('param', param);
    // alert(JSON.stringify(param))
    const res = await _fetch('apply_work', param);
    this.setState({
      refreshing: false,
    });
    console.warn('apply_work', res);
    if (res === 'Order placed successfully') {
      this.load_data();
    } else {
      // this.setState({
      //   okLoading: false,
      // });
      Toast_(res);
    }
    // this.setAcceptModalVisible();
  };

  navigate_data = navi => {
    move = navi;
  };
}
