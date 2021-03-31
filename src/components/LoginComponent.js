import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Logo from './Logo';
import Input from './Input'
import MainButton from './MainButton'
import IconButton from './IconButton'
import { Images } from '../constants/Images'

export default function LoginComponent(props) {

  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ phoneErrorMessage, setPhoneErrorMessage ] = useState('')

  const handelLoginBtn = (phoneNumber) => {
    checkPhone(phoneNumber)
  }
  const checkPhone = (phoneNumber) => {
    if (phoneNumber == '') {
      setPhoneErrorMessage("can't leave this empty")
    }
    else if( (+phoneNumber).toString() == NaN.toString() ) {
      setPhoneErrorMessage('Must enter only digits')
    }
    else {
      setPhoneErrorMessage('')
      console.log()
    }
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Input
        name='phone'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginTop: scale(90)}} errorMessage={phoneErrorMessage} />
      <MainButton onPress={ () => handelLoginBtn(phoneNumber) } title="LOGIN" style={{ marginTop: scale(50) }} />
      <Text style={styles.text}>Ou s'identifier avec</Text>
      <View style={{ flexDirection: 'row', marginTop: scale(40) }}>
        <IconButton logoSize={scale(30)} image={Images.googleLogo} style={{ marginRight: scale(60) }} />
        <IconButton logoSize={scale(25)} image={Images.facebookLogo} />
      </View>
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