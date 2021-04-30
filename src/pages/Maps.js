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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DirectionInfo from '../components/DirectionInfo';
import SendPosition from '../components/SendPosition';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'
Geocoder.init(apiKey);
const types = ['', 'WALKING', 'DRIVING', 'BICYCLING']

export default function Maps(props) {

  const [searchType, setSearchType] = useState(true)
  const [directionValues, setDirectionsValues] = useState({
    distance: '',
    duration: [],
  })
  const [ searchInput, setSearchInput ] = useState('')
  const [directionType, setDirectionType] = useState('1')
  const mapRef = React.createRef()
  const [directionVisible, setDirectionVisible] = useState(false);
  const [ itineraireVisible, setItineraireVisible ] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(false)
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  })
  const [markedLocation, setMarkedLocation] = useState({
    longitude: 0,
    latitude: 0,
    address: '',
    photoRef: '',
  })
  const [region, setRegion] = useState({
    longitude: 0,
    latitude: 0,
  })

  useEffect(() => {
    //props.navigation.navigate('SavePlace')
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        //console.log(location);
        setUserLocation(location)
        setRegion(location)
      })
      .catch(error => {
        const { code, message } = error;
        //console.warn(code, message);
        alert('activate your GPS for user experience')
      })
  }, [])


  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder='Search address'
        onPress={(data, details = null) => {
           console.log('data = ', data.structured_formatting.main_text)
          // console.log('details = ', details)
          Geocoder.from(data.description)
            .then(json => {
              var location = json.results[0].geometry.location;
              // console.log("location = ", location);
              setMarker(true)
              setMarkedLocation({
                latitude: location.lat,
                longitude: location.lng,
                address: data.description,
                photoRef: details.photos!=undefined ? details.photos[0].photo_reference : '',
                name: data.structured_formatting.main_text,
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
  
  const toggleItineraire = () => {
    setItineraireVisible(!itineraireVisible)
  }

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
        
          <MapViewDirections
            timePrecision='now'
            mode={types[directionType]}
            origin={userLocation}
            destination={markedLocation}
            apikey={apiKey}
            strokeWidth={ itineraireVisible ? 4 : 0}
            strokeColor='#2ad41e'
            onReady={result => {
              setDirectionsValues({
                distance: result.distance.toFixed(2),
                duration: [
                  Math.trunc(result.duration / 1440),
                  Math.trunc((result.duration % 1440) / 60),
                  (result.duration % 60).toFixed(0)
                    ]
              })
              try {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }
              catch { error => console.log(error) }
            }}
          />
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
        <TouchableOpacity
          onPress={() => setSearchType(!searchType)}
          style={styles.imageContainer}
        >
          {searchType && <FontAwesome5 name='map-signs' size={scale(18)} color={Colors.grey2} />}
          {!searchType && <FontAwesome5 name='user-friends' size={scale(18)} color={Colors.grey2} />}
        </TouchableOpacity>
        <View style={styles.search} >
          {!searchType && <View style={{
            backgroundColor: 'white', flex: 1,
            flexDirection: 'row',
            height: scale(40),
            borderRadius: scale(5),
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scale(2)
          }}>
            <TextInput
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search friends"
              selectionColor={Colors.purple}
              style={{
                fontSize: scale(14),
                flex: 0.9,
                marginLeft: scale(5)
              }} />
            <TouchableOpacity style={{
              marginRight: scale(2),
              flex: 0.2,
              height: scale(30),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <AntDesign name='search1' size={25} color={Colors.grey2} />
            </TouchableOpacity>
          </View>}
          {searchType && <GooglePlacesInput />}
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Notification')}
          style={styles.imageContainer}
        >
          <MaterialCommunityIcons name='bell' size={scale(22)} color={Colors.grey2} />
        </TouchableOpacity>
      </View>


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
            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 15000,
            })
              .then(location => {
                //console.log(location);
                setUserLocation(location)
                setRegion(location)
              })
              .catch(error => {
                const { code, message } = error;
                //console.warn(code, message);
                if (code != 'CANCELLED'){
                  alert('activate your GPS for user experience')
                }
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
        navigation={props.navigation}
        type="location"
        toggleItineraire={toggleItineraire}
        from={userLocation}
        to={markedLocation}
        close={() => setDirectionVisible(false)}
        visible={directionVisible}
        directionType={directionType}
        setDirectionType={setDirectionType}
        directionValues={directionValues}
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
    height: scale(40),
    width: scale(40),
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 10,
    backgroundColor: 'white',
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
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'flex-start',
    marginTop: scale(10),
    top: scale(0),
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    height: scale(200),
    borderRadius: scale(5),

  },
})