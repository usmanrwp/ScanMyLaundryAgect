import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import styles from './style';
import {NavigationEvents} from 'react-navigation';
import _retrieveData from '../../../local_cache/_retrieveData';
import _fetch from '../../../fetch_function/_fetch';
import moment from 'moment';
import No_Record from '../../../components/No_Record';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';
import {Footer, CheckBox, Container, Body, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabViewLoader from '../../../components/TabViewLoader';
import ButtonPressLoader from '../../../components/ButtonPressLoader';
import WebView from 'react-native-webview';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: 1,
          Customer_Name: 'Nouman',
          check: true,
          number: '0300123456',
          picture:
            'https://pbs.twimg.com/profile_images/972872769019850753/YTxFZF2x_400x400.jpg',
        },
      ],
      email: '',
      refreshing: true,
      deleteVisible: false,
      metaData: false,
      loading: true,
      generateRouteLoading: false,
      webViewRenderVisible: false,
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
    if (res[0].length === 0) {
      res[0] = 'No record';
    }
    this.setState({
      email,
      // dataSource: res[0],
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
        {this.webViewRender()}
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
                        source={{uri: item.picture}}
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
                          <Text style={styles.columnName}>Mobile Number </Text>
                        </View>

                        <Text style={styles.columnText}>{item.number}</Text>
                      </View>

                      <View style={styles.commentContainer}>
                        <Text style={styles.columnName}>Comment</Text>
                        <Text style={styles.columnText}> {item.comment}</Text>
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
                      <TouchableOpacity onPress={this.openDetails}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
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
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                colors={[Colors.gradient1, Colors.gradient2]}
                style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerText}>Pay</Text>
                </View>
              </LinearGradient>
            </Footer>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _onNavigationStateChange(webViewState) {
    console.warn('webViewState\n', webViewState.url);
    const url = webViewState.url;
    if (
      url === 'https://www.google.com/' ||
      url === 'https://www.google.com/?gws_rd=ssl'
    ) {
      this.setState({
        webViewRenderVisible: false,
        generateRouteLoading: false,
      });
    }
  }

  webViewRender = () => {
    return (
      <Modal
        visible={this.state.webViewRenderVisible}
        onRequestClose={() => {
          this.setState({
            webViewRenderVisible: false,
            generateRouteLoading: false,
          });
        }}>
        <View style={{flex: 1}}>
          <WebView
            ref="webview"
            source={{uri: 'https://scanmylaundry.com/api/stripe/'}}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            renderLoading={() => {
              return <TabViewLoader />;
            }}
          />
        </View>
      </Modal>
    );
  };

  generateRoute = async () => {
    this.setState({
      generateRouteLoading: true,
      webViewRenderVisible: true,
    });
  };
}
