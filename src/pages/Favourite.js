import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../constants/Colors';



export default function Favourite(props) {

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={{ padding: scale(10) }}>
          <AntDesign name='arrowleft' size={30} color='grey' />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', width: width }}>
        <TouchableOpacity style={{ padding: scale(10) }}>
          <Ionicons name='card' size={40} color={Colors.tabColor} />
        </TouchableOpacity>
        <View style={{ position: 'absolute', right: scale(10) }}>
          <TouchableOpacity style={{ alignItems: 'center', padding: scale(10) }}>
            <SimpleLineIcons name='pencil' size={20} color={Colors.tabColor} />
            <Text style={{ color: Colors.tabColor, fontSize: scale(10), fontWeight: 'bold' }} >
              Modifier profil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
      <View></View>
      <View></View>
    </View>
  );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})