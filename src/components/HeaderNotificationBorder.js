import React from 'react';
import {StatusBar, StyleSheet, Image, View} from 'react-native';
import {Header, Left, Body, Right, Title} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {Colors} from '../constants/Colors';
import Box from './Box';
import Text from './Text';
import Styles from '../constants/Styles';

const HeaderNotificationBorder = props => {
  const {title, isHome} = props;

  return (
    <Header androidStatusBarColor={Colors.statusBarColor} style={styles.header}>
      <Left style={{flex: 1,flexDirection:"row"}}>
        {isHome ? null : (
          <TouchableOpacity onPress={props?.onPressHandler}>
            <Icon name="arrow-back-outline" size={scale(25)} color={Colors.dark} />
          </TouchableOpacity>
        )}
        <Text
                  color="black"
                  style={{
                    fontSize: scale(18),
                    marginLeft: scale(20),
                  
                  }}>
                    {title ? title : ''}
                  </Text>
      </Left>
      <Right style={{flex: 1}}>
        {props.onRightPress ? (
          <TouchableOpacity onPress={props.onRightPress}>
            <Box style={{...Styles.Common.Row}}>
              <Icon
                name="notifications"
                size={scale(25)}
                color={Colors.statusBarColor}
              />
              <View
                style={{
                  backgroundColor: Colors.red,
                  width: scale(17),
                  height: scale(17),
                  borderRadius: scale(17 / 2),
                  marginTop: scale(-2),
                  marginLeft: scale(-7),
                  ...Styles.Common.RowCenter,
                }}>
                <Text
                  color="white"
                  style={{
                    fontSize: scale(9),
                    fontWeight: 'bold',
                    marginLeft: scale(2),
                  }}>
                  {props.notifNumber}{' '}
                </Text>
              </View>
            </Box>
          </TouchableOpacity>
        ) : null}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    elevation: scale(8),
  },
  title: {
    color: Colors.dark,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
  },
  icon: {
    color: Colors.dark,
  },
});

export default HeaderNotificationBorder;
