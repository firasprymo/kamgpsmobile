import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';

const TextButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      {...props}
      style={{...styles.button, ...props.style}}
      activeOpacity={0.8}>
      <Text
        style={{
          marginBottom: props.marginBottom,
          textAlign: props.textAlign,
          fontWeight: props.fontWeight,
          color: props.color,
          fontSize: props.fontSize,
          ...styles.text,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  text: {
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default TextButton;
