import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TextInput } from "react-native";
import { scale } from "react-native-size-matters";
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from "../constants/Colors";


export default function SendPosition(props) {



    return (<View style={styles.centeredView}>
        <View style={styles.modalView}>
            <TouchableOpacity style={{
                alignSelf: 'flex-start'
            }}
                onPress={() => props.setModalVisible(!props.modalVisible)} >
                <Feather name='x' size={40} color={Colors.grey2} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
                Lorem Ipsum
                </Text>
            <View style={{
                width: scale(220),
                height: scale(50),
                backgroundColor: Colors.grey3,
                borderRadius: scale(10),
                elevation: 5,
                flexDirection: 'row',
                marginTop: scale(20)
            }}>
                <TextInput
                    keyboardType='phone-pad'
                    placeholder='+216'
                    style={{
                        width: scale(60),
                        color: Colors.grey1,
                        fontSize: scale(20)
                    }} />
                <TextInput
                    keyboardType='phone-pad'
                    placeholder='12345678'
                    style={{
                        width: scale(160),
                        color: Colors.grey2,
                        fontSize: scale(24)
                    }} />
            </View>
            <TouchableOpacity style={{
                width: scale(150),
                height: scale(40),
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Colors.tabColor,
                marginTop: scale(20),
                alignItems: "center",
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: scale(20),
                marginBottom: scale(10)
            }}>
                <Text style={{
                    fontSize: scale(20),
                    fontWeight: 'bold',
                    color: Colors.tabColor
                }}>
                    Envoyer
                        </Text>
                <FontAwesome name='location-arrow' size={35} color={Colors.tabColor} />
            </TouchableOpacity>

        </View>
    </View>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: scale(300),
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: scale(10),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: scale(20),
        fontWeight: 'bold'
    }
})
