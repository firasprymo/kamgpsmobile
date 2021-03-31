import { Text } from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/Colors';
import Box from './Box';

export default function RegisterComponent(props) {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
                </View>
  );
}

const styles = StyleSheet.create(
  {
    container:{
      alignItems:'center',
      justifyContent:'center',
    }
  }
)