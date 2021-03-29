import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {TouchableOpacity} from 'react-native';

import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../constants/Styles';
import {Colors} from '../constants/Colors';
import Text from './Text';
import Box from './Box';
const TransparentHeaderNotification = props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={props?.onPressHandler}>
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
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: Dimensions.get('window').width * 0.01,
    marginVertical: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'flex-end',
    // flex: 2,
    // width: Dimensions.get('window').width * 0.8,
  },
  titleContainer: {
    flex: Platform.select({ios: 20, android: 10}),
    alignItems: Platform.select({ios: 'center'}),
    marginLeft: Styles.margins.xLarge,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.light,
    fontSize: scale(20),
  },
  icon: {
    color: Colors.light,
  },
});

export default TransparentHeaderNotification;
