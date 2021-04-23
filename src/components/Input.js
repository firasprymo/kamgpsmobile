import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal'

export default function Input(props) {
 
  const countryCode = props.countryCode !=undefined ? props.countryCode : ''
  const setCountryCode = props.setCountryCode
  const [ modal, setModal ] = useState(false)
  return (
    <View>
      <View style={[styles.container, { borderColor: props.errorMessage == '' ? '#d9d9d9' : Colors.red }, props.style]}>
        <Icon name={props.name} size={15} color="white" />
        {props.name == 'phone' && 
          <TouchableOpacity 
          onPress={()=>{setModal(true)}}
          style={{minWidth:scale(50), height:scale(25),
          alignItems:'center',justifyContent:'center',
          borderRightWidth:1,
          borderColor: '#d9d9d9',
          }}>
            <Text style={{color:'white', fontSize:scale(14)}}>
              {'+'+countryCode}
            </Text>
            <CountryPicker 
                        containerButtonStyle={{backgroundColor:'red', width: scale(0), height: scale(0)}}
            withCallingCode
            withAlphaFilter
            withFilter
            withFlag
            withFlagButton
            visible={modal}
            onSelect= {(val)=> {setCountryCode(val.callingCode)}}
            onClose= {()=> {setModal(false)}}
          />
          </TouchableOpacity>
          
          }
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          style={[styles.text, props.styleText]}
          selectionColor='white'
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor='white'
          secureTextEntry={props.secureTextEntry}
        />
      </View>
      { props.errorMessage == '' ?
        <View style={{ marginBottom: scale(17) }}></View> :
        <Text style={{ color: Colors.red, marginLeft: scale(10) }} >{props.errorMessage}</Text>}
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