import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from '../constants/Images';
import { api } from '../constants/api_config';






export default function RecievedFriendRequest(props) {

    const respond = (response) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "id": props.id, "status": response, "IDFriend": props.idfriend });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${api.url}friends/demendeAccepterFriend`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("patch  =  ",result)
                // send notif:
                console.log('currentuser', props.currentUser)
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${props.token}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "phonenumber": props.phone,
                    "app_id": "157c4da9-c189-439a-b76c-f4bf32edaba2",
                    "contents": { "en": `${props.currentUser.username} a ${response} votre demande d'ami.` },
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
                    <Text style={{ marginRight: scale(20) }}>+{props.phone} </Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', paddingLeft: scale(5),alignItems:'center' }}>
                    <MaterialCommunityIcons name='account-plus' size={scale(16)} color={Colors.logoBlue} />
                    <Text style={{ color: 'grey', marginLeft: scale(10), fontSize: scale(12) }} >Friend request</Text>
                    <Text style={{ color: 'grey', marginLeft: scale(10), fontSize: scale(10) }}>{props.date}</Text>
                </View>
            </View>
            <View style={{
                height: scale(40),
                alignSelf: 'center',
                borderLeftWidth: 0.5,
            }}></View>
            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            { props.status == 'waiting' &&
                <>
                <TouchableOpacity 
                    onPress={()=>{respond("accepter")}}
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
                    <MaterialCommunityIcons name='account-multiple-plus' color={Colors.logoBlue} size={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{respond("refuser")}}
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
                    <MaterialCommunityIcons name='delete-forever' color={Colors.red} size={scale(20)} />
                </TouchableOpacity>
                </>
                }
                 { props.status == 'accepted' && <View style={{flexDirection:'column',alignItems:'center', justifyContent:'center', marginLeft:scale(15)}}>
                  <AntDesign name='checkcircle' color={Colors.green2} size={scale(16)} />
                  <Text style={{color:Colors.green2, fontSize:scale(12),paddingTop: scale(5)}}>
                    Acceptée
                    </Text>
            </View>}
            { props.status == 'rejected' && <View style={{flexDirection:'column',alignItems:'center', justifyContent:'center', marginLeft:scale(15)}}>
                  <AntDesign name='exclamationcircle' color={Colors.red} size={scale(16)} />
                  <Text style={{color:Colors.red, fontSize:scale(12),paddingTop: scale(5)}}>
                    Refusée
                    </Text>
            </View>}
            </View>

        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
