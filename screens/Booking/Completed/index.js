import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import { NavigationEvents } from 'react-navigation';
import _retrieveData from '../../../local_cache/_retrieveData';
import _fetch from '../../../fetch_function/_fetch';
import moment from 'moment';
import No_Record from '../../../components/No_Record';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';
import Sure_Modal from '../../../components/Sure_Modal';
import TabViewLoader from '../../../components/TabViewLoader';

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
      refreshing: true,
      deleteVisible: false,
      detailsModalVisible: false,
      loading: true,
    };
  }

  async componentDidMount() {
    this.load_data();
  }

  load_data = async () => {
    const email = await _retrieveData();
    const param = {};
    param['email'] = email;
    const res = await _fetch('read_agent_job', param);
    console.warn('read_agent_job completed', res[2].length);
    if (res[2].length === 0 || res[2].length === '0') {
      res[2] = 'No record';
    }
    this.setState({
      email,
      dataSource: res[2], //'No record',
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

  setDetailsModalVisible = () => {
    this.setState({
      detailsModalVisible: !this.state.detailsModalVisible,
    });
  };

  openDetails = () => {
    alert('Details');
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
                    <View style={styles.customerNameContainer}>
                      <Text style={styles.customerNameText}>
                        {item.Customer_Name.split(' ')[0]}
                      </Text>
                    </View>
                  </View>


                  <View style={styles.boxContent}>
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

                      {/* <Text style={styles.columnName}>Comment</Text>
                        <Text style={styles.columnText}> {item.comment}</Text> */}

                      <Text style={styles.columnName}>
                        Comment:
                        {/* <Text style={styles.columnText}>ggigfuegfgiuweifgweiufiuweiufiuwegfgweufguiwieugfiuweiufiuwiuefiuweiufgiwiefgiuwiugjjfjhjgfgjhfjfjfjyyuuyfyuyfuyfutfutkfkutfutftuuyr6rutuktutu</Text> */}
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

                    </View>
                  </View>
                </View>

                <View style={[styles.dateTimeContainer, {}]}>


                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.columnTextDull, { paddingRight: 0, marginRight: 0, }]}>Delivery Date: </Text>
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
                    <TouchableOpacity onPress={() => move.navigate('Order_Details', {
                      item: item,
                    })}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                        colors={[Colors.gradient1, Colors.gradient2]}>
                        <Text style={styles.buttonText}>Details</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  {/* BUTTON Details END */}

                  {/* BUTTON Delete START */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => this.setState({ deleteVisible: true })}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                        colors={[Colors.gradient1, Colors.gradient2]}>
                        <Text style={styles.buttonText}>Delete</Text>
                      </LinearGradient>
                    </TouchableOpacity>
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

  navigate_data = (navi) => {
    move = navi;
  }

}
