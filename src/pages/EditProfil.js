import React, { useState } from 'react';
import {
  ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  View
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfilImageUpload from '../components/ProfilImageUpload';
import MainButton from '../components/MainButton'
import Input from '../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GetLocation from 'react-native-get-location'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { api } from '../constants/api_config';
import Geocoder from 'react-native-geocoding';

const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'
Geocoder.init(apiKey);


export default function EditProfil(props) {

  const { token } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [address, setAddress] = useState('')
  const [addressErrorMessage, setaddressErrorMessage] = useState('')
  const [file, setFile] = useState({
    filePath: '',
    type: '',
    uri: '',
  })
  const [photoChanged, setPhotoChanged] = useState(false)
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
    address: '',
  })
  const [successMessage, setSuccessMessage] = useState('')



  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log(location);
        Geocoder.from(location.latitude, location.longitude)
          .then(json => {
            console.log(json)
            var addressComponent = json.results[0].formatted_address;
            // console.log(addressComponent);
            setaddressErrorMessage('')
            setUserLocation({
              longitude: location.latitude,
              latitude: location.longitude,
              address: addressComponent,
            })
          })
          .catch(error => {
            console.log(error)

          });

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
        // alert("enable your GPS")
        setaddressErrorMessage('Enable your GPS')
      })
  }



  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${api.url}users/me`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == 'success') {
          console.log(result.data.data)

          setUsername(result.data.data.name)
          setEmail(result.data.data.email)
          setAddress(result.data.data.address)
          setUserLocation({
            longitude: result.data.data.lat,
            latitude: result.data.data.lng,
            address: result.data.data.address,
          })
          setFile({
            filePath: '',
            type: '',
            uri: `${api.url_photo}User/${result.data.data.photo}`,
          })
        }
      })
      .catch(error => console.log('error', error));
  }, [])


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
        setPhotoChanged(true)
      }
    });

  }

  const isEmailValid = () => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
  }
  const handelEditBtn = () => {
    let usernameTest = checkUsername(username)
    let emailTest = checkEmail(email)
    let addressTest = checkAddress()
    if (usernameTest && emailTest && addressTest) {
      setIsLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var formdata = new FormData();
      formdata.append("email", email);
      formdata.append("name", username);
      formdata.append("address", userLocation.address);
      formdata.append("lat", userLocation.latitude);
      formdata.append("lng", userLocation.longitude);
      if (photoChanged) {
        console.log('this is the uri : ', file.uri)
        formdata.append("photo", {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
        });
      }

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${api.url}users/updateMe`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("update user = ",result)
          setSuccessMessage(true)
          setIsLoading(false)
        })
        .catch(error => {
          setIsLoading(false)
          console.log('error', error)
        });
    }

  }

  const checkUsername = (username) => {
    if (username == '') {
      setUsernameErrorMessage("This field is required")
      return false
    }
    else if (username.length < 3) {
      setUsernameErrorMessage('3 characters minimum')
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

  return (
    <ImageBackground
      resizeMode='stretch'
      source={Images.loginBackground}
      style={styles.background}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Profil')}
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
              style={{ marginTop: scale(10) }}
              onPress={() => { launchImageLibraryFunction() }}
              source={file.uri != '' ? { uri: file.uri } : Images.emptyprofil} />
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

            <MainButton
              isLoading={isLoading}
              glowColor={Colors.logoBlue}
              onPress={() => handelEditBtn()}
              title="Modifier"
              style={{ marginTop: scale(5) }} />
            <View>
              {successMessage == true && <View style={{ alignItems: 'center' }}>
                <AntDesign style={{ marginTop: scale(20) }} name='check' color='green' size={scale(60)} />
                <Text style={{
                  color: 'white',
                  fontSize: scale(15),


                  marginTop: scale(20),
                }}>
                  Updated !
                        </Text>
              </View>}
            </View>
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
})

