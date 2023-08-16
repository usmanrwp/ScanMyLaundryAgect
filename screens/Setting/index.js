import React, {Component} from 'react';
import {
  View,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import _fetch from '../../fetch_function/_fetch';
import Loader from '../../components/Loader';
import Text from '../../components/CustomText';
import styles from './style';
import Header_ from '../../components/Header1';
import _deleteData from '../../local_cache/_deleteData';
import VersionNumber from 'react-native-version-number';

export default class index extends Component {
  state = {
    loading: true,
    email: '',
    name: '',
    picture: '',
    description: '11',
    data: [
      {
        id: 0,
        Name: 'Logout',
        Picture: require('../../assets/icons/logout.png'),
      },
    ],
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
      loading: false,
    });
  };

  open_menu = async id => {
    if (id === 0) {
      _deleteData();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <Header_ left back onBackPress={this.backPressed}
        round_corner={35} title={"Setting"} />

        <FlatList
          style={styles.bodyContent}
          data={this.state.data}
          extraData={this.state.metaData}
          horizontal={false}
          numColumns={1}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          keyExtractor={item => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            return (
              <TouchableOpacity
                onPress={() => this.open_menu(item.id)}
                style={styles.menuBox}>
                <Image
                  style={styles.icon}
                  source={item.Picture}
                  resizeMode="contain"
                />
                <Text style={styles.info}>{item.Name}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            VERSION {VersionNumber.appVersion}
          </Text>
        </View>
      </View>
    );
  }
}
