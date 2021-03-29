import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Colors} from '../constants/Colors';

const MainButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      activeOpacity={0.8}
      onPress={props.onPress}
      {...props}>
      {props.isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={[styles.text, props.styleText]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    //width: scale(220),
    backgroundColor: Colors.backgroundSplashBlue,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').width * 0.25,
    borderRadius: scale(25),
  },
  text: {
    color: Colors.light,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  buttonDisabled: {
    width: scale(300),
    backgroundColor: Colors.grey1,
    alignItems: 'center',
    padding: Dimensions.get('window').height * 0.02,
    borderRadius: 15,
    //marginVertical:16
  },
});

export default MainButton;
