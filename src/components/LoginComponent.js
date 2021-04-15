import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Logo from './Logo';
import Input from './Input'
import MainButton from './MainButton'
import IconButton from './IconButton'
import { Images } from '../constants/Images'
import { Colors } from '../constants/Colors';
import { useQuery } from 'react-query'
import TextButton from './TextButton';
import login from '../services/loginService'





export default function LoginComponent(props) {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ globalError, setGlobalError ] = useState('')


  // ++++++++++++++++++++++ login Handle +++++++++++++++++++++++++++++++++++++
  const handelLoginBtn = () => {
    setIsLoading(true)
    checkPhone(phoneNumber)
    checkPassword(password)
    if (checkPhone(phoneNumber) && checkPassword(password)) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "phonenumber": phoneNumber, "password": password });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://catalogue.cubesolutions.tn:5112/api/v1/users/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false);
          console.log(result)
          if (result.token){
            alert(result.token)
          }
          else if (result.message){
            setGlobalError(result.message)
          }
        })
        .catch(error => {
          console.log('error', error)
          setGlobalError('error with the server')
        });
    }
    else setIsLoading(false)
  }
  // ++++++++++++++++++++++ login Handle +++++++++++++++++++++++++++++++++++++


  const checkPhone = (phoneNumber) => {
    if (phoneNumber == '') {
      setPhoneErrorMessage("This field is required")
      return false
    }
    else if ((+phoneNumber).toString() == NaN.toString()) {
      setPhoneErrorMessage('Must enter only digits')
      return false
    }
    else if (phoneNumber.length < 8) {
      setPhoneErrorMessage('8 digits minimum')
      return false
    }
    else {
      setPhoneErrorMessage('')
      return true
    }
  }
  const checkPassword = (password) => {
    if (password == '') {
      setPasswordErrorMessage("This field is required")
      return false
    }
    else if (password.length < 4) {
      setPasswordErrorMessage('4 charateres minimum')
      return false
    }
    else {
      setPasswordErrorMessage('')
      return true
    }
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>
                {globalError}
            </Text>
      <Input
        keyboardType='numeric'
        placeholder='phone number'
        name='phone'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginTop: scale(10) }}
        errorMessage={phoneErrorMessage}
      />
      <Input
        secureTextEntry={true}
        placeholder='password'
        name='lock'
        value={password}
        onChangeText={setPassword}
        style={{ marginTop: scale(5) }}
        errorMessage={passwordErrorMessage}
      />
      <MainButton
        isLoading={isLoading}
        glowColor={Colors.logoGreen}
        onPress={() => handelLoginBtn(phoneNumber)}
        title="LOGIN"
        style={{ marginTop: scale(5) }}
      />
      <TextButton
        onPress={() => { props.navigation.navigate('ResetPassword') }}
        style={styles.reset}
        fontSize={scale(14)}
        color={Colors.white}
        title='Oublier mot de passe?'
      />


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
      color: 'crimson',
            marginTop: scale(60),
            width: scale(280),
            marginBottom: scale(10),
            fontSize: scale(12),
            textAlign: 'center'
    },
    reset: {
      marginTop: scale(20)
    }
  }
)