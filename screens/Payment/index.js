import React, {Component} from 'react';
import {View, Dimensions, BackHandler} from 'react-native';
import Text from '../../components/CustomText';
import {NavigationEvents} from 'react-navigation';
import _retrieveData from '../../local_cache/_retrieveData';
import _fetch from '../../fetch_function/_fetch';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Header_ from '../../components/Header';
import Dues from './Dues';
import Recieve from './Recieve';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Dues'},
        {key: 'second', title: 'Recieve'},
      ],
      email: null,
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
  }

  load_data = async () => {
    const email = await _retrieveData();
    this.setState({
      email,
    });
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        <Header_ left back onBackPress={this.backPressed} />

        <TabView
          navigationState={this.state}
          lazy={true}
          style={{marginTop: 0}}
          swipeEnabled
          renderScene={SceneMap({
            first: Dues,
            second: Recieve,
          })}
          renderTabBar={props => (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#d9207a', '#4279dc']}>
              <TabBar
                {...props}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBarContainer}
                renderLabel={({route, focused, color}) => (
                  <Text style={styles.tabViewText}>{route.title}</Text>
                )}
              />
            </LinearGradient>
          )}
          onIndexChange={index => this.setState({index})}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    );
  }
}
