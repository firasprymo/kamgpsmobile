import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Logo from './Logo';
import Input from './Input'
import MainButton from './MainButton'
import IconButton from './IconButton'
import { Images } from '../constants/Images'
import { Colors } from '../constants/Colors';
import ValidationComponent from './ValidationComponent';

export default function LoginComponent(props) {
  const [ codeInput, setCodeInput ] = useState(false)
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ phoneErrorMessage, setPhoneErrorMessage ] = useState('')

  const handelLoginBtn = () => {
    if (checkPhone(phoneNumber)) {
      setCodeInput(true)
    }
  }
  const checkPhone = (phoneNumber) => {
    if (phoneNumber == '') {
      setPhoneErrorMessage("This field is required")
      return false
    }
    else if( (+phoneNumber).toString() == NaN.toString() ) {
      setPhoneErrorMessage('Must enter only digits')
      return false
    }
    else if(phoneNumber.length<8) {
      setPhoneErrorMessage('8 digits minimum')
      return false
    }
    else {
      setPhoneErrorMessage('')
      return true
    }
  }

  return (
    <View style={styles.container}>
      <Logo />

      { codeInput ? <ValidationComponent parentComponent='login' nav={setCodeInput}/> :
        <> 
        <Input
        keyboardType= 'numeric'
        placeholder= 'phone number'
        name='phone'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginTop: scale(100)}} errorMessage={phoneErrorMessage} />
      <MainButton glowColor={Colors.logoGreen} onPress={ () => handelLoginBtn(phoneNumber) } title="LOGIN" style={{ marginTop: scale(20) }} />
      {/* <Text style={styles.text}>Ou s'identifier avec</Text>
      <View style={{ flexDirection: 'row', marginTop: scale(40), marginBottom: scale(40) }}>
        <IconButton logoSize={scale(30)} image={Images.googleLogo} style={{ marginRight: scale(60) }} />
        <IconButton logoSize={scale(25)} image={Images.facebookLogo} />
      </View> */}
      </>}

    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      padding: 40

    },
    text: {
      color: 'white',
      marginTop: scale(40)
    }
  }
)