import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Text from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default class Sure_Modal extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.hideModal}
        onBackdropPress={this.props.hideModal}
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={1}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.backgroundColor,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
              borderRadius: 10,
              height: null,
            }}>
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                paddingBottom: 15,
              }}>
              {this.props.text ? this.props.text : 'Are you sure?'}{' '}
            </Text>

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              {/* BUTTON START */}

              <View style={styles.buttonContainer}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                      style={styles.linear_style}>
                <TouchableOpacity onPress={this.props.yes}>
              
                    <Text>
                      {' '}
                      {this.props.yesText ? this.props.yesText : 'YES'}
                    </Text>
                </TouchableOpacity>
                </LinearGradient>

              </View>
              {/* BUTTON END */}
              {/* BUTTON START */}

              <View style={styles.buttonContainer}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                      style={styles.linear_style}>
                <TouchableOpacity onPress={this.props.no}>
                
                    <Text>{this.props.noText ? this.props.noText : 'NO'}</Text>
                </TouchableOpacity>
                </LinearGradient>

              </View>
              {/* BUTTON END */}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  galcam: {
    color: Colors.black,
    paddingHorizontal: 20,
    fontSize: 20,
    fontFamily: 'Raleway-BoldItalic',
  },
  galcamView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 25,
  },
  buttonContainer: {
    marginLeft: 5,
    // marginRight: 20,
    // marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  linear_style: {
    borderRadius: 20, padding: 7, paddingLeft: 10, paddingRight: 10, width:70, alignItems:"center"
  },
});
