import React, { useEffect, useState } from 'react';
import {
    Image, StyleSheet,
    Dimensions, View, Text,
    TextInput, TouchableOpacity,
    Modal
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, animateToRegion } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { api } from '../constants/api_config';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { useAppContext } from '../context/AppContext';

// distance btw points in Km :
const d = 10

const getPoints = (from, to) => {
    let points = []
    let a = from.latitude - to.latitude
    let b = from.longitude - to.longitude
    let distance = Math.ceil(111.2 * Math.sqrt(a * a + b * b))
    if (to.latitude != 0) {
        for (let i = 1; i < distance + 1; i += d) {
            points.push({
                lat: from.latitude - (a * i / distance),
                lng: from.longitude - (b * i / distance),
            })
        }
    }
    return points
}

export default function NearPlacesMarkers(props) {

    const { token } = useAppContext();
    const [points,setPoints] = useState( getPoints(props.from, props.to))
    const [places,setPlaces] = useState([])
        useEffect(() => {
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "data": getPoints(props.from, props.to) });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if(points!=[]) { fetch(`${api.url}maps/listePlaceDirection`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setPlaces(result.data)
                console.log(result)})
            .catch(error => console.log('error', error));}

    }, [props.to])
    return (
        <View>
            { places != [] && places.map((el) => 
            <Marker
            pressed
            title={el.name}
            key={el.lat}
            coordinate={{
                latitude: parseFloat(el.location.lat),
                longitude: parseFloat(el.location.lng),
            }} >
                {/* <FontAwesome5
            name='store-alt'
            size={25}
            color={Colors.tabColor}
          /> */}
          <View style={{width:scale(40),height:scale(40), borderRadius:scale(5), elevation:5, borderWidth:1,borderColor:'white'}}>
          <Image source={ el.photo!='default.jpg' ? {uri: `${api.url_photo}Favorite/${el.photo}`} : Images.emptyphoto}
          resizeMode='stretch'
                    style={{
                        width: scale(40),
                        height: scale(40),
                        borderRadius:scale(5)
                    }}
                />
          </View>
          
            </Marker>
            )}
        </View>
    )
}