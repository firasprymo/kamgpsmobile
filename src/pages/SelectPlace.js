import React, { useState } from 'react';
import {
  Image, StyleSheet,
  Dimensions, View, Text,
  TextInput, TouchableOpacity,
  Modal
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const apiKey = 'AIzaSyA3SzFNanrcbcb5iPqI8vJBZq6XZ-Aon0o'

export default function SelectPlace(props) {
  
  return (
    <View style={styles.mapcontainer}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showUserLocation={true} >
        <Marker coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }} />
      </MapView>
      <View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ padding: scale(5) }}>
                    <Feather name='x' size={30} color={Colors.grey2} />
                </TouchableOpacity>
                <View style={styles.search} >
          <TextInput
            selectionColor={Colors.purple}
            style={{
              flex: 0.9,
              marginLeft: scale(10)
            }} />
          <TouchableOpacity>
            <AntDesign name='search1' size={25} color={Colors.grey2} />
          </TouchableOpacity>
        </View>
                <TouchableOpacity
                    style={{ padding: scale(5) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: scale(18), color: Colors.grey2 }}>OK</Text>
                </TouchableOpacity>
            </View>
            <View style={{
        alignSelf: 'flex-end',
        margin: scale(10),
        width: scale(50),
        height: scale(100),
        flexDirection: 'column'
      }}>
        
        <TouchableOpacity style={{
          width: scale(50),
          height: scale(50),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons
            name='crosshairs-gps'
            size={scale(40)}
            color= {Colors.tabColor} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    height: scale(44),
    width: scale(40),
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    margin: 8,
    elevation: 10,
  },
  image: {
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    height: scale(40),
    width: scale(40),
    borderColor: "white",
    borderWidth: 0.8,
  },
  header: {
    position: 'absolute',
    width: width,
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    top: scale(0),
  },
  search: {
    backgroundColor: 'white', flex: 0.8,
    height: scale(35),
    borderRadius: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: scale(5),
  },
  headBar: {
    width: width,
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(10)
},
})