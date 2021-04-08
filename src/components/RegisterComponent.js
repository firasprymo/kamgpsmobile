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

  const [ codeInput, setCodeInput ] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [address, setAddress] = useState('')
  const [addressErrorMessage, setaddressErrorMessage] = useState('')
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
  const handelLoginBtn = () => {
    let phoneTest = checkPhone(phoneNumber)
    let usernameTest = checkUsername(username)
    let emailTest = checkEmail(email)
    let addressTest = checkAddress(address)
    if (phoneTest && usernameTest && emailTest && addressTest) {
      setCodeInput(true)
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

  return (
    <View style={styles.container}>
      
        { codeInput ? <ValidationComponent
                        navigation={props.navigation} 
                        style={{marginTop: scale(80)}}
                        parentComponent='register'
                        nav={props.nav}/> :
        <> 
        <ProfilImageUpload
        style={{marginTop:scale(10)}}
        onPress={() => { launchImageLibraryFunction() }}
        source={file.fileUri != '' ? { uri: file.fileUri } : null} />
          <Input
        placeholder='username'
        name='user'
        value={username}
        onChangeText={setUsername}
        style={{ marginTop: scale(40) }}
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
      <MainButton
        glowColor={Colors.logoBlue}
        onPress={() => handelLoginBtn(phoneNumber)}
        title="REGISTER"
        style={{ marginTop: scale(5) }} />

      {/* <Text style={styles.text}>
        Ou s'identifier avec
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          marginBottom: scale(40)
        }}>
        <IconButton
          logoSize={scale(30)}
          image={Images.googleLogo}
          style={{ marginRight: scale(60) }} />
        <IconButton
          logoSize={scale(25)}
          image={Images.facebookLogo} />
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
      marginTop: scale(20)
    }
  }
)