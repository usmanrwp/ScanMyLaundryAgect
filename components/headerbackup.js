import React, {Component} from 'react';
import {View} from 'react-native';
import {Header, Left, Body, Right, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './CustomText';
import Colors from '../constants/Colors';
import Cache_Image from './Cache_Image';
import {Image_Show_Url} from '../urls/Image_Show_Url';
import LinearGradient from 'react-native-linear-gradient';


export default class Header_ extends Component {
  render() {
    const font = this.props.fontFamily
      ? this.props.fontFamily
      : 'Raleway-Regular';
    const color = this.props.color ? this.props.color : '#fff';
    const fontSize = this.props.fontSize ? this.props.fontSize : 16;
    const backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : Colors.header;

    const style = [
      {fontFamily: font, color: color, fontSize: fontSize},
      {backgroundColor: backgroundColor},
      this.props.style || {},
    ];
    const allProps = Object.assign({}, this.props, {style: style});
    return (
      <Header
        {...allProps}
        androidStatusBarColor={Colors.statusBar}
        iosBarStyle="light-content"
        style={
          // {this.props.title ? this.props.title : "title"}
          {
            backgroundColor: Colors.header,
            // borderTopColor: Colors.header,
            // borderTopWidth: 3,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            // paddingTop: 15,
            // paddingBottom: 15
            height: 80,
            borderBottomLeftRadius: 35


          }}>



            
        {this.props.left === true ? (
          <View
            style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            {this.props.left === true ? (
              this.props.back === true ? (
                <Button onPress={this.props.onBackPress} transparent>
                  <Icon name="ios-arrow-back" size={28} color="#fff" />
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Raleway-Bold',
                        color: Colors.white,
                        marginHorizontal: 5,
                        textAlign: 'center',
                      }}>
                      {this.props.title ? this.props.title : 'Back'}
                    </Text>
                  </View>
                </Button>
              ) : (
                <Button onPress={this.props.onMenuPress} transparent>
                  <Icon name="ios-menu" size={28} color="#fff" />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Raleway-Bold',
                      color: Colors.white,
                      marginHorizontal: 5,
                    }}>
                    {this.props.title ? this.props.title : 'Back'}
                  </Text>
                </Button>
              )
            ) : null}
          </View>
        ) : (
          <Body
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              top: 5,
              alignContent: 'flex-start',
              flex: 1,
            }}>
            <Cache_Image
              uri={Image_Show_Url + 'head_logo.png'}
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Title
              style={{
                fontSize: 20,
                fontFamily: 'Raleway-BoldItalic',
                color: Colors.white,
                top: this.props.left === true ? null : 10,
              }}>
              {this.props.title ? this.props.title : 'title'}
            </Title>
          </Body>
        )}

        <Right>
          {this.props.RightText ? (
            <Button onPress={this.props.RightTextPress} transparent>
              <Icon
                name={
                  this.props.RightTextIcon
                    ? this.props.RightTextIcon
                    : 'ios-navigate'
                }
                size={20}
                color="#fff"
                style={{marginRight: 3}}
              />
              <Text>
                {this.props.RightTextTitle ? this.props.RightTextTitle : ''}
              </Text>
            </Button>
          ) : this.props.save === true ? (
            <Button onPress={this.props.savePress} transparent>
              <Icon
                name={
                  this.props.saveIcon ? this.props.saveIcon : 'ios-done-all'
                }
                size={50}
                color="#fff"
              />
            </Button>
          ) : this.props.right === true ? (
            this.props.rightIcon1 === true ? (
              this.props.rightIcon2 === true ? (
                this.props.rightIcon3 === true ? (
                  <View style={{flexDirection: 'row'}}>
                    <Button onPress={this.props.rightIcon1Press} transparent>
                      <Icon
                        name={
                          this.props.rightIcon1Name
                            ? this.props.rightIcon1Name
                            : 'ios-search'
                        }
                        size={28}
                        color="#fff"
                      />
                    </Button>
                    <Button onPress={this.props.rightIcon2Press} transparent>
                      <Icon name="ios-contact" size={28} color="#fff" />
                    </Button>
                    <Button onPress={this.props.rightIcon3Press} transparent>
                      <Icon name="ios-filing" size={28} color="#fff" />
                    </Button>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Button onPress={this.props.rightIcon1Press} transparent>
                      <Icon
                        name={
                          this.props.rightIcon1Name
                            ? this.props.rightIcon1Name
                            : 'ios-search'
                        }
                        size={28}
                        color="#fff"
                      />
                    </Button>
                    <Button onPress={this.props.rightIcon2Press} transparent>
                      <Icon name="ios-contact" size={28} color="#fff" />
                    </Button>
                  </View>
                )
              ) : this.props.rightIcon3 === true ? (
                <View style={{flexDirection: 'row'}}>
                  <Button onPress={this.props.rightIcon1Press} transparent>
                    <Icon
                      name={
                        this.props.rightIcon1Name
                          ? this.props.rightIcon1Name
                          : 'ios-search'
                      }
                      size={28}
                      color="#fff"
                    />
                  </Button>
                  <Button onPress={this.props.rightIcon2Press} transparent>
                    <Icon name="ios-filing" size={28} color="#fff" />
                  </Button>
                </View>
              ) : (
                <Button onPress={this.props.rightIcon1Press} transparent>
                  <Icon
                    name={
                      this.props.rightIcon1Name
                        ? this.props.rightIcon1Name
                        : 'ios-search'
                    }
                    size={28}
                    color="#fff"
                  />
                </Button>
              )
            ) : null
          ) : (
            <Button transparent>
              <Text>{this.props.rightTitle ? this.props.rightTitle : ''}</Text>
            </Button>
          )}
        </Right>
      
      
      </Header>
    );
  }
}
