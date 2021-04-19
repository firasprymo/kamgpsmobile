import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Logo from './Logo';
import Input from './Input'
import MainButton from './MainButton'
import IconButton from './IconButton'
import { Images } from '../constants/Images'
import { Colors } from '../constants/Colors';
import TextButton from './TextButton';
import { api } from '../constants/api_config';

export default function ValidationComponent(props) {

    const [code, setCode] = useState('')
    const [codeErrorMessage, setCodeErrorMessage] = useState('')

    const handelOkBtn = () => {

        if (checkCode(code)) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "phonenumber": props.phoneNumber, "code": code });

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
                        props.setCurrentTab('login')
                    }
                    else {
                        setCodeErrorMessage('invalid code')
                    }
                })
                .catch(error => console.log('error', error));
            
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
    //
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.text}>
                We sent you a validation code to {props.phoneNumber}
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
                onPress={() => handelOkBtn(code)}
                title="OK"
                style={{ marginTop: scale(30) }} />

            <TextButton onPress={() => { props.setCodeInput(false) }}
                style={styles.back}
                fontSize={scale(14)}
                color={Colors.white}
                title='< Back'
            />

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
            marginTop: scale(40),
            width: scale(280),
            marginBottom: scale(10),
            fontSize: scale(12),
            textAlign: 'center'
        },
        back: {
            marginTop: scale(30),
            color: Colors.white,
        }
    }
)