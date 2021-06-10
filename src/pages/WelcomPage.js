import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import { scale } from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';
import { Images } from '../constants/Images'
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../constants/Colors';
import { useAppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../constants/api_config';




export default function WelcomPage(props) {
  const {setToken, setCurrentUser} = useAppContext();
  React.useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('token').then((token) => {
        if (token) {
          
          //console.log("token",token)
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
      
          var raw = "";
      
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          fetch(`${api.url}users/Me`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.status=='success'){
                console.log(result)
                setCurrentUser({
                  username: result.data.data.name,
                  photo: result.data.data.photo,
                  id: result.data.data.id,
                  phone: result.data.data.phonenumber,
                })
                props.navigation.navigate('Home');
              } else {
                props.navigation.navigate('Auth');
              }
            })
            .catch(error => {
              props.navigation.navigate('Auth');
              console.log('error', error)
            });

        } else {
          props.navigation.navigate('Introduction');
        }
      });
    } , 2000);
  }, []);
  return (
    <ImageBackground style={styles.background} source={Images.welcomeBackground}>
      <StatusBar hidden />
      <Animatable.Image
        style={styles.logo}
        animation="bounceIn"
        duration={500}
        source={Images.logo}
        resizeMode='stretch'

      />
      <Animatable.View
        animation="bounceIn"
        duration={500}
        style={{ marginBottom: scale(70), alignItems: 'center' }}
      >
        <View
          style={{ flexDirection: 'row' }}>
          <Text style={{ color: Colors.logoBlue, fontSize: scale(30) }}>Lorem </Text>
          <Text style={{ color: Colors.green1, fontSize: scale(30) }}>ipsum</Text>
        </View>

        <Text style={{ color: Colors.light, fontSize: scale(15) }}>SLOGAN HERE</Text>
      </Animatable.View>
      <Image
        source={Images.logoTransparent}
        style={styles.backgroundLogo}
        resizeMode='stretch'
      />

    </ImageBackground>
  );
}



const { height, width } = Dimensions.get('screen');
const height_logo = height * 0.18;
const width_logo = width * 0.4;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: width_logo,
    height: height_logo,
    marginTop: scale(120),
    marginBottom: scale(20),
  },
  backgroundLogo: {
    width: width * 1.2,
    height: height * 0.55,
  }
});
