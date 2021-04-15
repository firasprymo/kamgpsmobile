import { Text } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import MainButton from './MainButton'
import Input from './Input';
import Logo from './Logo';
import ProfilImageUpload from './ProfilImageUpload';
import IconButton from './IconButton';
import { Images } from '../constants/Images';
import { launchImageLibrary } from 'react-native-image-picker';
import ValidationComponent from './ValidationComponent';

export default function RegisterComponent(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [ errorFromServer, setErrorFromServer ] = useState('')
  const [codeInput, setCodeInput] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [address, setAddress] = useState('')
  const [addressErrorMessage, setaddressErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [repassword, setRepassword] = useState('')
  const [repasswordErrorMessage, setRepasswordErrorMessage] = useState('')
  const [file, setFile] = useState({
    filePath: '',
    fileData: '',
    fileUri: '',
  })

  const launchImageLibraryFunction = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        fileData: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        setFile({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  const isEmailValid = () => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
  }
  const handelRgisterBtn = () => {
    setIsLoading(true)
    let repasswordTest = checkRepassword(repassword)
    let passwordTest = checkPassword(password)
    let phoneTest = checkPhone(phoneNumber)
    let usernameTest = checkUsername(username)
    let emailTest = checkEmail(email)
    let addressTest = checkAddress(address)
    if (phoneTest && usernameTest && emailTest && addressTest && passwordTest && repasswordTest) {
      
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email":email,
  "name":username,
  "password":password,
  "role":"admin",
  "passwordConfirm":repassword,
  "phonenumber":phoneNumber,
  "address":address});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  fetch("http://catalogue.cubesolutions.tn:5112/api/v1/users/signup", requestOptions)
  .then(response => response.json())
  .then(result => {
    setIsLoading(false)
    console.log(result)
    if (result.status=='fail'){
      if (result.errors.statusCode==410){
        setErrorFromServer("account already exist")
      }
      else {
        setErrorFromServer('Invalid input data')
      }
    } else if (result.status == 'success') {
      setCodeInput(true)
    }
    
  })
  .catch(error => {
    // console.log('error', error)
  });
    }
    else {
      setIsLoading(false)
    }

  }
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
  const checkUsername = (username) => {
    if (username == '') {
      setUsernameErrorMessage("This field is required")
      return false
    }
    else if (username.length < 8) {
      setUsernameErrorMessage('8 characters minimum')
      return false
    }
    else {
      setUsernameErrorMessage('')
      return true
    }
  }
  const checkEmail = (email) => {
    if (email == '') {
      setEmailErrorMessage("This field is required")
      return false
    }
    else if (!isEmailValid()) {
      setEmailErrorMessage('Email not valid')
      return false
    }
    else {
      setEmailErrorMessage('')
      return true
    }
  }
  const checkAddress = (address) => {
    if (address == '') {
      setaddressErrorMessage("This field is required")
      return false
    }
    else {
      setaddressErrorMessage('')
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
  const checkRepassword = (repassword) => {
    if (repassword == '') {
      setRepasswordErrorMessage("This field is required")
      return false
    }
    else if (repassword!=password) {
      setRepasswordErrorMessage('Not identical')
      return false
    }
    else {
      setRepasswordErrorMessage('')
      return true
    }
  }

  return (
    <View style={styles.container}>

      { codeInput ? <ValidationComponent
      phoneNumber={phoneNumber}
      setCurrentTab={props.setCurrentTab}
        style={{ marginTop: scale(80) }}
        parentComponent='register'
        setCodeInput={setCodeInput} /> :
        <>
          
          <ProfilImageUpload
            onPress={() => { launchImageLibraryFunction() }}
            source={file.fileUri != '' ? { uri: file.fileUri } : null} />
            <Text style={{ color: Colors.red, marginTop: scale(20) }}>{errorFromServer}</Text>
          <Input
            placeholder='username'
            name='user'
            value={username}
            onChangeText={setUsername}
            style={{ marginTop: scale(10) }}
            errorMessage={usernameErrorMessage} />
          <Input
            keyboardType='email-address'
            placeholder='xyz@gmail.com'
            name='envelope'
            value={email}
            onChangeText={setEmail}
            style={{ marginTop: scale(5) }}
            errorMessage={emailErrorMessage} />
          <Input
            keyboardType='numeric'
            placeholder='phone number'
            name='phone'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={{ marginTop: scale(5) }}
            errorMessage={phoneErrorMessage} />
          <Input
            placeholder='address'
            name='map-marker'
            value={address}
            onChangeText={setAddress}
            style={{ marginTop: scale(5) }}
            errorMessage={addressErrorMessage} />
          <Input
            secureTextEntry={true}
            placeholder='password'
            name='lock'
            value={password}
            onChangeText={setPassword}
            style={{ marginTop: scale(5) }}
            errorMessage={passwordErrorMessage}
          />
          <Input
            secureTextEntry={true}
            placeholder='retype password'
            name='lock'
            value={repassword}
            onChangeText={setRepassword}
            style={{ marginTop: scale(5) }}
            errorMessage={repasswordErrorMessage}
          />
          <MainButton
            isLoading={isLoading}
            glowColor={Colors.logoBlue}
            onPress={() => handelRgisterBtn(phoneNumber)}
            title="REGISTER"
            style={{ marginTop: scale(5) }} />
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
      marginTop: scale(20)
    }
  }
)