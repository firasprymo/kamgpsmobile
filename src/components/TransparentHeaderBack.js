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
import Icon from 'react-native-vector-icons/AntDesign';
import Styles from '../constants/Styles';
import {Colors} from '../constants/Colors';
import Text from './Text';
import Box from './Box';
const TransparentHeaderBack = props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={props?.onPressHandler}>
          <Box style={{...Styles.Common.Row}}>
            <Icon name="left" size={scale(35)} color={Colors.statusBarColor} />
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
    marginVertical: Dimensions.get('window').height * 0.05,
    alignItems: 'center',
    // height: scale(300),
  },
  iconContainer: {
    flexDirection: 'row',
    width: scale(320),
    justifyContent: 'flex-start',
    // flex: 2,
    // width: Dimensions.get('window').width * 0.8,
  },
  titleContainer: {
    //flex: Platform.select({ios: 20, android: 10}),
    alignItems: Platform.select({ios: 'center'}),
    marginTop: Styles.margins.xLarge,
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.dark,
    fontSize: scale(20),
  },
  icon: {
    color: Colors.light,
  },
});

export default TransparentHeaderBack;
