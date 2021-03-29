import React from 'react';
import {TextInput} from 'react-native';
import {Colors} from '../constants/Colors';
import Box from './Box';
import Text from './Text';

export default function Input(props) {
  return (
    <Box backgroundColor="white" borderRadius={30} elevation={5}>
      <TextInput {...props} placeholderTextColor={Colors.grey2} />
    </Box>
  );
}
