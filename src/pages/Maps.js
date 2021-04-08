import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const apiKey = 'AIzaSyA3SzFNanrcbcb5iPqI8vJBZq6XZ-Aon0o'

export default function Maps(props) {

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
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.user3}
          />
        </View>
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
      </View>
      <View style={{
        position: 'absolute', right: scale(10), bottom: scale(20), width: scale(50), height: scale(100), flexDirection: 'column'
      }}>
        <TouchableOpacity style= {{width: scale(50), height: scale(50), justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '-45deg'}] }}>
          <FontAwesome name='location-arrow' size={scale(40)} color= {Colors.grey1} />
        </TouchableOpacity>
        <TouchableOpacity style= {{width: scale(50), height: scale(50), justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name='crosshairs-gps' size={scale(40)} color= {Colors.grey1} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
    backgroundColor: 'white', flex: 0.9,
    height: scale(35),
    borderRadius: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: scale(5),
  },
})