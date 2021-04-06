import React from 'react';
import {
    ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    View
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import { Colors } from '../constants/Colors';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

export default function LoginPage(props) {
    const [currentTab, setCurrentTab] = React.useState('login')

    return (
        <ImageBackground resizeMode='stretch' source={Images.loginBackground} style={styles.background}>
            <StatusBar hidden />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {currentTab == 'login' ? <LoginComponent /> : <RegisterComponent />}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View style={{width: width, flexDirection:'row', justifyContent: 'space-between', marginTop: scale(100)}}>
            <TouchableOpacity
                style={{
                    ...styles.login,
                    backgroundColor: currentTab == 'login' ? Colors.buttonColor : null
                }}
                onPress={() => { setCurrentTab('login') }} >
                <Text style={{ color: Colors.white, fontSize: scale(16) }}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.register,
                    backgroundColor: currentTab == 'register' ? Colors.buttonColor : null
                }}
                onPress={() => { setCurrentTab('register') }} >
                <Text style={{ color: Colors.white, fontSize: scale(16) }}>REGISTER</Text>
            </TouchableOpacity>
            </View>
            
        </ImageBackground>

    );
}
const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        paddingTop: scale(20),
        justifyContent:'space-between'
    },
    shape: {
        width: width * 2,
        height: height * 2,
        position: 'absolute',
    },
    login: {
        width: scale(150),
        height: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: scale(30),
        alignSelf:'flex-end'
    },
    register: {
        width: scale(150),
        height: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius: scale(30),
    
    },

});
