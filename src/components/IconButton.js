import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { scale } from 'react-native-size-matters';

export default function IconButton(props) {
    return (


        <TouchableOpacity style={[styles.button, props.style]}
            onPress={props.onPress} >

            {props.isLoading ? (
                <ActivityIndicator size="large" color="grey" />
            ) : (
                <Image resizeMode='contain' source={props.image} style={{ height: props.logoSize }} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            width: scale(50), height: scale(50), backgroundColor: 'rgba(255, 255, 255,1)',
            borderRadius: scale(10),
            flexDirection: "row", alignItems: 'center', padding: scale(10), justifyContent: 'center'
        },
        text: {
            color: 'white',
            fontSize: scale(15)
        }
    }
)

