import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from '../constants/Images';
import { api } from '../constants/api_config';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';



const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'
Geocoder.init(apiKey);


export default function RecievedLocationRequest(props) {


    const handleResponse = (response) => {
        if (response == 'accepter') {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    respond(response, location.latitude, location.longitude)
                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                    alert('Enable your GPS')
                })
        }
        else {
            respond(response, 0, 0)
        }
    }


    const respond = (response, lat, lng) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "id": props.id, "status": response, "location": { "lat": lat, "lng": lng } });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${api.url}friends/demendeAccepterLocation`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // send notif:
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${props.token}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "phonenumber": props.phone,
                    "app_id": "157c4da9-c189-439a-b76c-f4bf32edaba2",
                    "contents": { "en": `${props.currentUser.username} a ${response} votre demande de localisation` },
                    "headings": {
                        "en": `Votre demande a était ${response}`
                    }
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${api.url}friends/recoitNotification`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        props.refresh()
                        console.log(result)
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }
    return (
        <View style={{ flexDirection: 'row', width: width, height: scale(60), borderColor: Colors.grey3, borderBottomWidth: 1, marginBottom: 0.5 }}>


            <View style={{ flex: 0.7, flexDirection: 'column', paddingVertical: scale(5), paddingLeft: scale(20) }}>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ marginLeft: scale(10) }}>{props.name}</Text>
                    <Text style={{ marginRight: scale(20) }}>+{props.phone}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', paddingLeft: scale(5), alignItems: 'center' }}>
                    <MaterialCommunityIcons name='map-marker-path' size={scale(16)} color={Colors.logoBlue} />
                    <Text style={{ color: 'grey', marginLeft: scale(10), fontSize: scale(12) }} >Location request</Text>
                    <Text style={{ color: 'grey', marginLeft: scale(10), fontSize: scale(10) }}>{props.date}</Text>
                </View>
            </View>
            <View style={{
                height: scale(40),
                alignSelf: 'center',
                borderLeftWidth: 0.5,
            }}></View>
            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {props.status == 'accepted' && <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: scale(15) }}>
                    <AntDesign name='checkcircle' color={Colors.green2} size={scale(16)} />
                    <Text style={{ color: Colors.green2, fontSize: scale(12), paddingTop: scale(5) }}>
                        Acceptée
                    </Text>
                </View>}
                {props.status == 'waiting' &&
                    <>
                        <TouchableOpacity
                            onPress={() => { handleResponse("accepter") }}
                            style={{
                                padding: scale(3),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.grey3,
                                borderRadius: scale(100),
                                padding: scale(5),
                                elevation: 5,
                                marginLeft: scale(10),
                            }}>
                            <MaterialCommunityIcons name='check-bold' color={Colors.logoBlue} size={scale(20)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { handleResponse("refuser") }}
                            style={{
                                padding: scale(3),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.grey3,
                                borderRadius: scale(100),
                                padding: scale(5),
                                elevation: 5,
                                marginRight: scale(10)
                            }}>
                            <MaterialCommunityIcons name='cancel' color={Colors.red} size={scale(20)} />
                        </TouchableOpacity>
                    </>
                }
                {props.status == 'rejected' && <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: scale(15) }}>
                    <AntDesign name='exclamationcircle' color={Colors.red} size={scale(16)} />
                    <Text style={{ color: Colors.red, fontSize: scale(12), paddingTop: scale(5) }}>
                        Refusée
                    </Text>
                </View>}

            </View>

        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
