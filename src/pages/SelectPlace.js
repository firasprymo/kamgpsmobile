import React, { useEffect, useState } from 'react';
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import { useAppContext } from '../context/AppContext';



const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'



export default function SelectPlace(props) {

  const {setMarkedPlace} = useAppContext()
  const mapRef = React.createRef()
  const [marker, setMarker] = useState(true)
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
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        //console.log(location);
        setUserLocation(location)
        setRegion(location)
        console.log('useeffect')
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
        {marker && 
          <Marker
            title='keep pressing to drag'
            draggable={true}
            onDragEnd={(e) => {
              //console.log('e = ',e)
              setMarkedLocation({
                longitude: e.nativeEvent.coordinate.longitude,
                latitude: e.nativeEvent.coordinate.latitude,
                address: '',
                photoRef: '',
              })
              setRegion({
                longitude: e.nativeEvent.coordinate.longitude,
                latitude: e.nativeEvent.coordinate.latitude,
              })
            }}
            coordinate={{
              latitude: markedLocation.latitude,
              longitude: markedLocation.longitude,
              }} 
            />}
      </MapView>
      <View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => {

                      props.navigation.goBack()
                    }}
                    style={{ padding: scale(5) }}>
                    <Feather name='x' size={30} color={Colors.grey2} />
                </TouchableOpacity> 
                <GooglePlacesInput />
                <TouchableOpacity
                    onPress={() => {
                      setMarkedPlace(markedLocation)
                      props.navigation.goBack()
                    }}
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
        <TouchableOpacity 
          onPress={()=>{
           // setMarker(!marker)
            setRegion({
              longitude: mapRef.current.__lastRegion.longitude,
              latitude: mapRef.current.__lastRegion.latitude,
            })
            setMarkedLocation({
              longitude: mapRef.current.__lastRegion.longitude,
              latitude: mapRef.current.__lastRegion.latitude,
              address: '',
              photoRef: '',
            })
          }}
          style={{
            width: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name='map-marker-circle'
            size={scale(40)}
            color= {Colors.tabColor} />
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
    height: scale(250),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: scale(10),
    paddingHorizontal: scale(10)
},
})