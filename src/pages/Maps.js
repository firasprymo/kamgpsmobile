import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet,
  Dimensions, View, Text,
  TextInput, TouchableOpacity,
  Modal
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import MapView, { PROVIDER_GOOGLE, Marker, animateToRegion } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DirectionInfo from '../components/DirectionInfo';
import SendPosition from '../components/SendPosition';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

const apiKey = 'AIzaSyAu36aMMdQo_LbFdwNA50L9GzPpowXxMMQ'
const My_apiKey = 'AIzaSyBYlvG5jLKDG7LPwLr_ufTxomnx-MCIrHc'
Geocoder.init(apiKey);


export default function Maps(props) {


  const mapRef = React.createRef()
  const [directionVisible, setDirectionVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(false)
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  })
  const [markedLocation, setMarkedLocation] = useState({
    longitude: 0,
    latitude: 0,
  })
  const [region, setRegion] = useState({
    longitude: 0,
    latitude: 0,
  })

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setUserLocation(location)
        setRegion(location)
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [])


  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete

        placeholder='Search'
        onPress={(data, details = null) => {

          Geocoder.from(data.description)
            .then(json => {
              var location = json.results[0].geometry.location;
              console.log("location = ", location);
              setMarker(true)
              setMarkedLocation({
                latitude: location.lat,
                longitude: location.lng,
                address: data.description,
              })
              setRegion({
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              })
              setDirectionVisible(true)
            })
            .catch(error => console.warn("error = ", error));
          // 'details' is provided when fetchDetails = true
          // console.log("name = ",data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
        }}
      />
    );
  };


  return (
    <View style={styles.mapcontainer}>

      <MapView
        ref={mapRef}
        onRegionChange={(region) => {

        }}
        style={styles.map}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}

        showUserLocation={true} >
          {directionVisible && <MapViewDirections
    origin={userLocation}
    destination={markedLocation}
    apikey={apiKey}
    strokeWidth={4}
    strokeColor='#2ad41e'
  />}
        {marker && <Marker coordinate={{
          latitude: markedLocation.latitude,
          longitude: markedLocation.longitude,
        }} />}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }} >
          <Image
            resizeMode='stretch'
            source={Images.myplace}
            style={{
              width: scale(20),
              height: scale(20)
            }}
          />
        </Marker>

      </MapView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.user3}
          />
        </TouchableOpacity>
        <View style={styles.search} >
          {/* <TextInput
            selectionColor={Colors.purple}
            style={{
              flex: 0.9,
              marginLeft: scale(10)
            }} />
          <TouchableOpacity>
            <AntDesign name='search1' size={25} color={Colors.grey2} />
          </TouchableOpacity> */}
          <GooglePlacesInput />
        </View>
      </View>

      {/* ++++++++++++++++++++++++++++ this is only for debugging !! +++++++++++++++++++++++++++ */}
      {/* <TouchableOpacity
        onPress={() => setDirectionVisible(true)}
        style={{ backgroundColor: 'aqua', padding: scale(10), borderRadius: 50 }}>
        <Text>Show component</Text>
      </TouchableOpacity> */}

      {/* ++++++++++++++++++++++++++++ this is only for debugging !! +++++++++++++++++++++++++++ */}

      <View style={{
        alignSelf: 'flex-end',
        margin: scale(10),
        width: scale(50),
        height: scale(100),
        flexDirection: 'column'
      }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            width: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '-45deg' }]
          }}>
          <FontAwesome
            name='location-arrow'
            size={scale(40)}
            color={directionVisible ? Colors.tabColor : Colors.grey1} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRegion({
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            })
          }}
          style={{
            width: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <MaterialCommunityIcons
            name='crosshairs-gps'
            size={scale(40)}
            color={directionVisible ? Colors.tabColor : Colors.grey1} />
        </TouchableOpacity>
      </View>
      <DirectionInfo
        from={userLocation}
        to={markedLocation}
        close={() => setDirectionVisible(false)}
        visible={directionVisible}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SendPosition
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </Modal>

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
    marginHorizontal: 5,
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
    height: scale(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: scale(10),
    top: scale(0),
  },
  search: {
    backgroundColor: null, flex: 0.9,
    flexDirection: 'row',
    height: scale(200)
  },
})