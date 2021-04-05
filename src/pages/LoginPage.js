import React from 'react';
import {
    ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {currentTab == 'login' ? <LoginComponent /> : <RegisterComponent />}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

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
        </ImageBackground>

    );
}
const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center"
    },
    shape: {
        width: width * 2,
        height: height * 2,
        position: 'absolute',
    },
    login: {
        width: width * 0.47,
        height: height * 0.08,
        position: 'absolute',
        marginTop: height * 0.84,
        alignItems: 'center',
        justifyContent: 'center',
        left: scale(0),
        borderTopEndRadius: scale(30)
    },
    register: {
        width: width * 0.47,
        height: height * 0.08,
        position: 'absolute',
        marginTop: height * 0.84,
        alignItems: 'center',
        justifyContent: 'center',
        right: scale(0),
        borderTopStartRadius: scale(30)
    },

});
