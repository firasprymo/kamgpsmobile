import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

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
       }}  />
   </MapView>
</View>
  );
}

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  mapcontainer: {
        height: height * 0.8,
        width: width ,
        justifyContent: 'flex-end',
        alignItems: 'center',
  },
  map: {
        ...StyleSheet.absoluteFillObject,
  },
})