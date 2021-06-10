import { position } from '@shopify/restyle';
import React from 'react';
import { View,Text, Image, StyleSheet, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';



export default function Logo(props) {

    return (
        <View style={[styles.container,props.style]}>
            <Image
                style={styles.logo}
                source={Images.logo}
                resizeMode='stretch'
            />
            <View style={styles.title}>
                <View
                    style={{ flexDirection: 'row' }}>
                    <Text style={{ color: Colors.logoBlue, fontSize: scale(22) }}>Lorem </Text>
                    <Text style={{ color: Colors.green1, fontSize: scale(22), fontWeight:'bold' }}>Ipsum</Text>
                </View>
                <Text style={{ color: Colors.white, fontSize: scale(12) }}>SLOGAN HERE</Text>
            </View>
        </View>
    )
}
const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        width:width,
        height: height * 0.16
    },
  logo: {
    height: height * 0.14,
    width: width * 0.32,
    marginLeft: width*0.1,
  },
  title: {
      alignItems: 'center',
      position: 'absolute',
      marginTop: scale(60),
      marginLeft: scale(140)
  }
});