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

export default function ValidationComponent(props) {

    const [code, setCode] = useState('')
    const [codeErrorMessage, setCodeErrorMessage] = useState('')

    const handelOkBtn = () => {
        if (checkCode(code)) {
            alert('valid')
        }
    }
    const checkCode = (code) => {
        if (code == '') {
            setCodeErrorMessage("This field is required")
            return false
        }
        else if (code.length != 4) {
            setCodeErrorMessage('The code is 6 digits length')
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
                We sent you a validation code
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

            <TextButton onPress={() => { props.nav(false) }}
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
            width:scale(280),
            marginBottom: scale(10),
            fontSize: scale(12),
            textAlign:'center'
        },
        back: {
            marginBottom: scale(10),
            marginTop: scale(60),
            color: Colors.white,
        }
    }
)