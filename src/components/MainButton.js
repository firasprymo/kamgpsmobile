import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';

export default function Input(props) {

  return (

    <View style={[styles.container, props.style]}>
      <TouchableOpacity
      disabled={props.isLoading}
        style={[styles.button,{borderColor: props.glowColor}]}
        onPress={props.onPress} 
        >

        {props.isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={[styles.text, props.styleText]}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      borderRadius: scale(15), borderColor: 'rgba(29, 219, 79,0.09)', borderWidth: 5,
    },
    button: {
      width: scale(240), height: scale(35), backgroundColor: 'rgba(255, 255, 255,0.02)',
       borderWidth: 1, borderRadius: scale(7),
      flexDirection: "row", alignItems: 'center', paddingHorizontal: scale(10), justifyContent: 'center'
    },
    text: {
      color: 'white',
      fontSize: scale(15)
    }
  }
)

