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
import { api } from '../constants/api_config';

export default function ResetPassword(props) {

    const [currentTab, setCurrentTab] = useState(1)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
    const [code, setCode] = useState('')
    const [codeErrorMessage, setCodeErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [repassword, setRepassword] = useState('')
    const [repasswordErrorMessage, setRepasswordErrorMessage] = useState('')

    const handelSendBtn = (phoneNumber) => {
        var phoneTest = checkPhone(phoneNumber)
        if (phoneTest) {
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "phonenumber": phoneNumber });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            console.log('fetch started')
            fetch(`${api.url}users/forgotPassword`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status=='success'){
                        setCurrentTab('2')
                    }
                    else (setPhoneErrorMessage('phone not existed'))
                    
                } )
                .catch(error => console.log('error', error));
                console.log('fetch ended')
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
            
        }
    }
    const handelValidateBtn = (code) => {
        var codeTest = checkCode(code)
        if (codeTest) {
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "phonenumber": phoneNumber, "code": code });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${api.url}users/codeVerification`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.message=="votre compte est confirme!"){
                        setCurrentTab('3')
                    }
                    else {
                        setCodeErrorMessage('invalid code')
                    }
                })
                .catch(error => console.log('error', error));
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            
        }
    }
    const handelOkBtn = (password, repassword) => {
        var passwordTest = checkPassword(password)
        var repasswordTest = checkRepassword(repassword)
        if (passwordTest && repasswordTest) {
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"phonenumber":phoneNumber,"password":password,"passwordConfirm":repassword});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${api.url}users/resetPassword`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.status == 'success'){
        setCurrentTab(4)
    } else {setRepasswordErrorMessage('Please try again later')}
   
  })
  .catch(error => console.log('error', error));
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            
        }
    }
    const handelGoBtn = () => {
        props.navigation.navigate('Login')
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
    const checkCode = (code) => {
        if (code == '') {
            setCodeErrorMessage("This field is required")
            return false
        }
        else if (code.length != 4) {
            setCodeErrorMessage('The code is 4 digits length')
            return false
        }
        else {
            setCodeErrorMessage('')
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
        else if (repassword != password) {
            setRepasswordErrorMessage('Not identical')
            return false
        }
        else {
            setRepasswordErrorMessage('')
            return true
        }
    }
    return (
        <ImageBackground resizeMode='stretch' source={Images.loginBackground} style={styles.background}>
            <StatusBar hidden />
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
                style={{ padding: scale(5), alignSelf: 'flex-start' }}>
                <AntDesign name='arrowleft' size={30} color='white' />
            </TouchableOpacity>

            { currentTab == 1 &&
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Write your number here to recieve a validation code
                        </Text>
                    <Input
                        keyboardType='numeric'
                        placeholder='phone number'
                        name='phone'
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={{ marginTop: scale(10) }}
                        errorMessage={phoneErrorMessage}
                    />
                    <MainButton
                        glowColor={Colors.logoGreen}
                        onPress={() => handelSendBtn(phoneNumber)}
                        title="Send Code"
                        style={{ marginTop: scale(10) }}
                    />
                </View>
            }
            { currentTab == 2 &&
                <View style={styles.container}>
                    <Text style={styles.text}>
                        We sent you a validation code to {phoneNumber}
                    </Text>
                    <Input
                        placeholder='Write code here'
                        name='lock'
                        value={code}
                        onChangeText={setCode}
                        errorMessage={codeErrorMessage}
                        styleText />
                    <MainButton
                        glowColor={Colors.logoGreen}
                        onPress={() => handelValidateBtn(code)}
                        title="Reset My Password"
                        style={{ marginTop: scale(10) }} />
                </View>
            }
            { currentTab == 3 &&
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Enter a new Password for your account
                </Text>
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
                        glowColor={Colors.logoGreen}
                        onPress={() => handelOkBtn(password, repassword)}
                        title="OK"
                        style={{ marginTop: scale(10) }} />
                </View>
            }

            { currentTab == 4 &&
                <View style={styles.container}>
                    <AntDesign style={{ marginTop: scale(80) }} name='check' color='green' size={scale(80)} />
                    <Text style={{
                        color: 'white',
                        fontSize: scale(15),
                        width: scale(270),

                        marginTop: scale(20),
                    }}>
                        Your password is updated successfully, login now with your new password</Text>
                    <MainButton
                        glowColor={Colors.logoGreen}
                        onPress={() => handelGoBtn()}
                        title="Go to Login"
                        style={{ marginTop: scale(40) }} />
                </View>}

        </ImageBackground>
    )
}
const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        padding: scale(10),
    },
    container: {
        alignItems: 'center',
        padding: 40

    },
    text: {
        color: 'white',
        marginTop: scale(100),
        width: scale(280),
        marginBottom: scale(10),
        fontSize: scale(12),
        textAlign: 'center'
    },

})