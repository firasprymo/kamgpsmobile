import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, TextInput, View } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';
import GetLocation from 'react-native-get-location'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Geocoder from 'react-native-geocoding';
import OneSignal from 'react-native-onesignal';

const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'
Geocoder.init(apiKey);

export default function RegisterComponent(props) {

  const [ deviceId, setDeviceID ] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorFromServer, setErrorFromServer] = useState('')
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
    fileName: '',
    uri: '',
    type: '',
  })
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
    address: '',
  })



  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        Geocoder.from(location.latitude, location.longitude)
          .then(json => {
            console.log(json)
            var addressComponent = json.results[0].formatted_address;
            console.log(addressComponent);
            setaddressErrorMessage('')
            setUserLocation({
              longitude: location.latitude,
              latitude: location.longitude,
              address: addressComponent,
            })
          })
          .catch(error => {
            console.warn(error)

          });

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
        setaddressErrorMessage('Enable your GPS')
      })
  }


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
        setFile(response);
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
    let addressTest = checkAddress()
    if (phoneTest && usernameTest && emailTest && addressTest && passwordTest && repasswordTest) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var formdata = new FormData();
      formdata.append("IDdivice", deviceId)
      formdata.append("email", email);
      formdata.append("phonenumber", countryCode + phoneNumber);
      formdata.append("name", username);
      formdata.append("address", userLocation.address);
      formdata.append("password", password);
      formdata.append("passwordConfirm", repassword);
      formdata.append("lat", userLocation.latitude);
      formdata.append("lng", userLocation.longitude);


      if (file.uri != '') {
        formdata.append("photo", {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
        });
      }

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${api.url}users/signup`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false)
          console.log(result)
          if (result.status == 'fail') {
            if (result.errors.statusCode == 410) {
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
          console.log('error', error)
          setErrorFromServer('Server error')
          setIsLoading(false)
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
    else if (countryCode == '') {
      setPhoneErrorMessage('Select country code')
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
  const checkAddress = () => {
    if (userLocation.address == '') {
      setaddressErrorMessage("Your address is required")
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
    else if (password.length < 8) {
      setPasswordErrorMessage('8 charateres minimum')
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
    else if (repassword != password) {
      setRepasswordErrorMessage('Not identical')
      return false
    }
    else {
      setRepasswordErrorMessage('')
      return true
    }
  }
// React.useEffect(() => {
//   // OneSignal.setAppId()
//     OneSignal.addEventListener('ids', onIds);
//     function onIds(device) {
//       console.log(device);
//       if (device?.userId) {
//         console.log(device?.userId)
//         setDeviceID(device.userId)
//         OneSignal.enableSound(true);
//         OneSignal.enableVibrate(true);
//       }
//     }
//   }, []);

  return (
    <View style={styles.container}>

      { codeInput ? <ValidationComponent
        phoneNumber={countryCode + phoneNumber}
        setCurrentTab={props.setCurrentTab}
        style={{ marginTop: scale(80) }}
        parentComponent='register'
        setCodeInput={setCodeInput} /> :
        <>

          <ProfilImageUpload
            onPress={() => { launchImageLibraryFunction() }}
            source={file.uri != '' ? { uri: file.uri } : null} />
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
            errorMessage={phoneErrorMessage}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />

          <View>
            <View style={[styles.container1, { borderColor: addressErrorMessage == '' ? '#d9d9d9' : Colors.red }]}>
              <Icon name='map-marker' size={15} color="white" />


              {addressErrorMessage == '' ?
                <Text
                  style={styles.text1}
                  selectionColor='white'

                >{userLocation.address}
                </Text>
                :
                <Text style={[styles.text1, { color: Colors.red }]}>{addressErrorMessage}</Text>
              }
              <TouchableOpacity
                onPress={() => getLocation()}
                style={{
                  width: scale(60),
                  height: scale(30),
                  backgroundColor: null,
                  borderLeftWidth: 1,
                  borderColor: '#d9d9d9',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons name='map-search-outline' size={scale(22)} color='white' />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Input
            placeholder='address'
            name='map-marker'
            value={address}
            onChangeText={setAddress}
            style={{ marginTop: scale(5) }}
            errorMessage={addressErrorMessage} /> */}
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
    },
    container1: {
      width: scale(240), height: scale(35), backgroundColor: 'rgba(255, 255, 255,0.08)',
      borderWidth: 1, borderRadius: scale(7),
      flexDirection: "row", alignItems: 'center', paddingHorizontal: scale(10),
      marginBottom: scale(15)
    },
    text1: {
      flex: 1,
      paddingLeft: scale(10),
      color: 'white',
      fontSize: scale(12)
    }
  }
)