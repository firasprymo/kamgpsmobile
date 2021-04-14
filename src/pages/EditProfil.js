import React, { useState } from 'react';
import {  ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfilImageUpload from '../components/ProfilImageUpload';
import MainButton from '../components/MainButton'
import Input from '../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';




export default function EditProfil(props) {

 
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
    const handelEditBtn = () => {
      let phoneTest = checkPhone(phoneNumber)
      let usernameTest = checkUsername(username)
      let emailTest = checkEmail(email)
      let addressTest = checkAddress(address)
      if (phoneTest && usernameTest && emailTest && addressTest) {
       alert('Modified')
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
        <ImageBackground resizeMode='stretch' source={Images.loginBackground} style={styles.background}>
            <TouchableOpacity
                    onPress={() => props.navigation.navigate('Favourite')}
                    style={{ padding: scale(5), alignSelf: 'flex-start' }}>
                    <AntDesign name='arrowleft' size={30} color='white' />
                </TouchableOpacity>
        <StatusBar hidden />
        <KeyboardAvoidingView style={{
    flex: 1,
    alignItems: "center",
}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <> 
        <ProfilImageUpload
        style={{marginTop:scale(10)}}
        onPress={() => { launchImageLibraryFunction() }}
        source={file.fileUri != '' ? { uri: file.fileUri } : Images.user3} />
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
        onPress={() => handelEditBtn()}
        title="Modifier"
        style={{ marginTop: scale(5) }} />
        </>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ImageBackground>
    );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        padding: scale(10),
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    headBar: {
        width: width,
        height: scale(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(10)
    },
    image: {
        borderRadius: (Dimensions.get('window').height * 0.3) / 2,
        height: scale(40),
        width: scale(40),
        borderColor: "white",
        borderWidth: 0.8,
        flex: 0.15,
        marginLeft: scale(5)
    },
    button: {
        backgroundColor: null,
        width: scale(50),
        height: scale(50),
        marginTop: scale(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
})

