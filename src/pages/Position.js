import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';




export default function Position(props) {
    return(
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          marginTop: scale(10),
          paddingBottom: scale(10),
          borderBottomColor:Colors.grey4,
          borderBottomWidth: 0.2,
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1
        }}>
          Position
              </Text>
      </View>
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
