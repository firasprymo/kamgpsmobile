import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Content, Row } from 'native-base';
import Swipeable from 'react-native-swipeable';
import Animated from 'react-native-reanimated';




export default function EditProfil(props) {

    return (
        <View style={styles.container} >
            <Text>EditProfil</Text>
        </View>
    );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
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
})

