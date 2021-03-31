import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';

export default function Input(props) {
  return (
    <View style={[styles.container,{borderColor: props.errorMessage=='' ? '#d9d9d9' : 'red'}, props.style]}>
      <Icon name={props.name} size={25} color="white" />
      <TextInput
        value={props.value}
        onChangeText = {props.onChangeText}
        style={[styles.text, props.styleText]}
        selectionColor='white'
        keyboardType='numeric'
        placeholder='phone number'
        placeholderTextColor='white'
      />

    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      width: scale(240), height: scale(40), backgroundColor: 'rgba(255, 255, 255,0.08)',
       borderWidth: 1, borderRadius: scale(10),
      flexDirection: "row", alignItems: 'center', paddingHorizontal: scale(10)
    },
    text: {
      flex: 1,
      paddingLeft: scale(10),
      color: 'white',
      fontSize: scale(15)
    }
  }
)