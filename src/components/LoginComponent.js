import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Logo from './Logo';
import Input from './Input'
import MainButton from './MainButton'
import { Colors } from '../constants/Colors';
import TextButton from './TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';


export default function LoginComponent(props) {

  const [ countryCode, setCountryCode ] = useState('')    
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ globalError, setGlobalError ] = useState('')
  const {setCurrentUser} = useAppContext();
  const {setToken} = useAppContext();

  // ++++++++++++++++++++++ login Handle +++++++++++++++++++++++++++++++++++++


  //+++++++++
  const handelLoginBtn = () => {
    setIsLoading(true)
    checkPhone(phoneNumber)
    checkPassword(password)
    if (checkPhone(phoneNumber) && checkPassword(password)) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "phonenumber": countryCode+phoneNumber, "password": password });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`${api.url}users/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false);
          console.log(result)
          if (result.token){
            // alert(result.token)
            // storeData(result.token)
            setToken(result.token)
            props.navigation.navigate('Home')
          }
          else if (result.message){
            setGlobalError(result.message)
            setIsLoading(false)
          }
        })
        .catch(error => {
          console.log('error', error)
          setGlobalError('error with the server')
          setIsLoading(false)
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
    else if (countryCode=='') {
      setPhoneErrorMessage('Select country code')
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
        countryCode={countryCode}
        setCountryCode={setCountryCode}
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