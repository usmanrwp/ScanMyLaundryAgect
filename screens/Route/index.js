import React, {Component} from 'react';
import {View, Dimensions, BackHandler} from 'react-native';
import Text from '../../components/CustomText';
import {NavigationEvents} from 'react-navigation';
import _retrieveData from '../../local_cache/_retrieveData';
import _fetch from '../../fetch_function/_fetch';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Header_ from '../../components/Header1';
import Collection from './Collection';
import Delivery from './Delivery';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Collection', indx: 0 },
        {key: 'second', title: 'Delivery', indx: 1 },
      ],
      email: null,
      selectedItem: 0

    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    this.load_data();

    const obj = new Collection();
    obj.navigate_data(this.props.navigation);
    const obj1 = new Delivery();
    obj1.navigate_data(this.props.navigation);
  }

  load_data = async () => {
    const email = await _retrieveData();
    this.setState({
      email,
    });
  };

  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({ selectedItem: index });
    //  alert(index);
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        <Header_ left back onBackPress={this.backPressed} title={"Route"} />

        <TabView
          navigationState={this.state}
          lazy={true}
          style={{marginTop: 0}}
          swipeEnabled
          renderScene={SceneMap({
            first: Collection,
            second: Delivery,
          })}
          renderTabBar={props => (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
              style={{ borderBottomLeftRadius: 40 }}>
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: "transparent"
                }}
                style={styles.tabBarContainer}
                renderLabel={({route, focused, color}) => (
                  <View
                  style={
                    this.state.selectedItem === route.indx ? {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 30, width: 100, alignItems: "center"
                    } : {
                        alignItems: "center"
                      }}>
                  <Text
                    style={{ color: "#F2FBFF", padding: 7, margin: 5, fontSize: 12, fontFamily: "Raleway-BoldItalic" }}>
                    {route.title}
                  </Text>
                </View>
                )}
              />
            </LinearGradient>
          )}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    );
  }
}
