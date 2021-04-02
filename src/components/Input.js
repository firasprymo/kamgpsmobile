import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';

export default function Input(props) {
  return (
    <View>
    <View style={[styles.container,{borderColor: props.errorMessage=='' ? '#d9d9d9' : Colors.red}, props.style]}>
      <Icon name={props.name} size={15} color="white" />
      <TextInput
        value={props.value}
        onChangeText = {props.onChangeText}
        style={[styles.text, props.styleText]}
        selectionColor='white'
        keyboardType= {props.keyboardType} 
        placeholder= {props.placeholder}
        placeholderTextColor='white'
      />
    </View>
    { props.errorMessage=='' ? 
      <View style={{marginBottom: scale(20)}}></View> : 
      <Text style={{color:Colors.red, marginLeft:scale(10) }} >{props.errorMessage}</Text> }
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      width: scale(240), height: scale(35), backgroundColor: 'rgba(255, 255, 255,0.08)',
       borderWidth: 1, borderRadius: scale(7),
      flexDirection: "row", alignItems: 'center', paddingHorizontal: scale(10)
    },
    text: {
      flex: 1,
      paddingLeft: scale(10),
      color: 'white',
      fontSize: scale(12)
    }
  }
)