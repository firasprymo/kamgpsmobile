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
            setCurrentTab('2')
        }
    }
    const handelValidateBtn = (code) => {
        var codeTest = checkCode(code)
        if (codeTest) {
            setCurrentTab('3')
        }
    }
    const handelOkBtn = (password,repassword) => {
        var passwordTest = checkPassword(password)
        var repasswordTest = checkRepassword(repassword)
        if (passwordTest && repasswordTest){
            alert('Changed')
            props.navigation.navigate('Login')
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
                    onPress={() => handelOkBtn(password,repassword)}
                    title="OK"
                    style={{ marginTop: scale(10) }} />
            </View>
            }

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