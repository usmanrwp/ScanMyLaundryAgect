import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import styles from './style';
import { NavigationEvents } from 'react-navigation';
import _retrieveData from '../../../local_cache/_retrieveData';
import _fetch from '../../../fetch_function/_fetch';
import moment from 'moment';
import No_Record from '../../../components/No_Record';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';
import { Footer, CheckBox } from 'native-base';
import CurrentLocation from '../../../functions/CurrentLocation';
import Toast_ from '../../../functions/Toast_';
import TabViewLoader from '../../../components/TabViewLoader';
import ButtonPressLoader from '../../../components/ButtonPressLoader';


let move = "";


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      email: '',
      refreshing: true,
      deleteVisible: false,
      metaData: false,
      loading: true,
      generateRouteLoading: false,
    };
  }

  async componentDidMount() {
    this.load_data();
  }

  load_data = async () => {
    const email = await _retrieveData();
    const param = {};
    param['email'] = email;
    let res = await _fetch('read_route_orders', param);
    console.warn('pppdfhhh', res[0]);

    if (res[0].length === 0) {
      res[0] = 'No record';
    }
    this.setState({
      email,
      dataSource: res[0],
      customerDateTime:
        moment(new Date()).format('L') + ' ' + moment(new Date()).format('LT'),
      refreshing: false,
      loading: false,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.load_data(),
    );
  };

  openDetails = () => {

    alert('Details');
  };

  changeCheckBox = data => {
    const cb = data.check;
    let tog = null;
    if (cb === 'true' || cb === true) {
      tog = false;
    } else {
      tog = true;
    }
    data.check = tog;
    const index = this.state.dataSource.findIndex(item => data.id === item.id);

    let a = this.state.dataSource;

    a[index] = data;

    this.setState({
      data: a,
      metaData: !this.state.metaData,
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

        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.dataSource}
          extraData={this.state.metaData}
          renderItem={service => {
            const item = service.item;

            return (
              <View style={styles.flatListContainer}>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    color='#446BD6'
                    checked={item.check}
                    onPress={() => this.changeCheckBox(item)}
                  />
                </View>
                {/* START of BOX */}
                <TouchableOpacity
                  onPress={() => this.changeCheckBox(item)}
                  style={styles.boxMain}>
                  <View style={styles.box}>
                    <View style={styles.imageNameContainer}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.picture }}
                      />
                      <View style={styles.customerNameContainer}>
                        <Text style={styles.customerNameText}>
                          {item.Customer_Name.split(' ')[0]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.boxContent}>
                      <View style={styles.mobileCheck_CircleMainContainer}>
                        <View style={styles.mobileCheck_CircleContainer}>
                          <Text style={styles.columnName}>Mobile Number: </Text>
                          <Text style={styles.columnText}>{item.number}</Text>

                        </View>

                      </View>

                      <View style={styles.commentContainer}>

                        {/* <Text style={styles.columnName}>Comment</Text>
                        <Text style={styles.columnText}> {item.comment}</Text> */}

                        <Text style={styles.columnName}>
                          Comment:
                          {/* <Text style={styles.columnText}>ggigfuegfgiuweifgweiufiuweiufiuwegfgweufguiwieugfiuweiufiuwiuefiuweiufgiwiefgiuwiugjjfjhjgfgjhfjfjfjyyuuyfyuyfuyfutfutkfkutfutftuuyr6rutuktutu</Text> */}
                          <Text style={styles.columnText}>{" " + item.comment}</Text>
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

                      </View>

                    </View>
                  </View>

                  <View style={styles.dateTimeContainer}>
                    <Text style={styles.columnTextDull}>
                      {moment(new Date()).format('L')}{' '}
                    </Text>

                    <View style={styles.timeContainer}>
                      <Text style={styles.columnTextDull}>
                        {moment(new Date()).format('LT')}{' '}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.border} />

                  <View style={styles.buttonMainContainer}>
                    {/* BUTTON Details START */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        // onPress={this.openDetails}

                        onPress={() => move.navigate('Order_Details', {
                          item: item
                        })}

                      >
                        <LinearGradient
                          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          style={styles.button}
                          colors={[Colors.gradient1, Colors.gradient2]}>
                          <Text style={styles.buttonText}>Details</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    {/* BUTTON Details END */}
                  </View>
                </TouchableOpacity>
                {/* END OF BOX */}
              </View>
            );
          }}
        />
        {this.state.generateRouteLoading ? (
          <ButtonPressLoader />
        ) : (
          <TouchableOpacity onPress={this.generateRoute}>
            <Footer style={styles.footerMainContainer}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={[Colors.gradient1, Colors.gradient2]}
                style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerText}>Generate Route</Text>
                </View>
              </LinearGradient>
            </Footer>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  generateRoute = async () => {
    this.setState({
      generateRouteLoading: true,
    });
    let currentLocation = await CurrentLocation();
    if (currentLocation === 'Please Enable Location') {
      Toast_('Please Enable Location');
      this.setState({
        generateRouteLoading: false,
      });
      return;
    }
    let ways = '';
    let destination = '';

    for (let i = 0; i < this.state.dataSource.length; i++) {
      const element = this.state.dataSource[i];
      if (element.check === true || element.check === 'true') {
        // let len = this.state.dataSource.length;
        // len = parseInt(len) - parseInt(1);
        // if (!(i === len)) {
        if (i === 0) {
          ways = ways + element.lattitude + ',' + element.longitude;
        } else {
          ways = ways + '|' + element.lattitude + ',' + element.longitude;
        }
        // } else {
        //   destination = element.lattitude + ',' + element.longitude;
        // }
      }
    }
    if (ways === '' || ways === null) {
      Toast_('No Route is generated!');
      this.setState({
        generateRouteLoading: false,
      });
      return;
    }

    currentLocation =
      currentLocation.coords.latitude + ',' + currentLocation.coords.longitude;

    let url =
      'https://www.google.com/maps/dir/?api=1&origin=' +
      currentLocation +
      '&destination=' +
      currentLocation +
      '&waypoints=' +
      ways;

    console.warn('url', url);
    // return;
    this.setState({
      generateRouteLoading: false,
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.warn("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.warn('An error occurred', err));
  };

  navigate_data = navi => {
    move = navi;
  };
}
