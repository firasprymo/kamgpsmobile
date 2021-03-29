import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function IconButton(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={props.onPress}>
      <Icon {...props} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
