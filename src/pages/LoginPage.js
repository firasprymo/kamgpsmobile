import React from 'react';
import { ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';
import * as Animatable from 'react-native-animatable';
import { Images } from '../constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants/Colors';
import { Footer, FooterTab, View } from 'native-base';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

export default function LoginPage(props) {
    const [currentTab,setCurrentTab] =React.useState('login')

    return (
        
            <LinearGradient colors={[Colors.backgroundColor1, Colors.backgroundColor2]} style={styles.background}>

                <Image source={Images.backgroundShape} style={styles.shape} resizeMode='stretch'/>
                {currentTab == 'login' ? <LoginComponent/> : <RegisterComponent/> }
                

                <TouchableOpacity style={{...styles.login,backgroundColor: currentTab=='login' ? Colors.buttonColor : null}}
                onPress={()=> {setCurrentTab('login')}} >
                    <Text style={{ color: Colors.white, fontSize: scale(30) }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.register,backgroundColor: currentTab=='register' ? Colors.buttonColor : null}}
                onPress={()=> {setCurrentTab('register')}} >
                    <Text style={{ color: Colors.white, fontSize: scale(30) }}>Register</Text>
                </TouchableOpacity>





            </LinearGradient>
      
    );
}
const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center"
    },
    shape: {
        width: width*2,
        height: height*1,
        position: 'absolute',
    },
    login:{
        width: width * 0.47, height: height * 0.1,
        position: 'absolute', bottom: scale(0), alignItems: 'center', justifyContent: 'center', left: scale(0),
        borderTopEndRadius: scale(30)
    },
    register: {width: width * 0.47, height: height * 0.1,
        position: 'absolute', bottom: scale(0), alignItems: 'center', justifyContent: 'center', right: scale(0),
        borderTopStartRadius: scale(30)},
   
});
