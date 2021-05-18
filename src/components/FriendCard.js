import { Card, Text } from 'native-base';
import React from 'react';
import { Image, TouchableOpacity, View, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import Dash from 'react-native-dash'
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';

export default function FriendCard({ data, navigation, userID }) {

    const Radius = scale(100)
    const Width = scale(90)
    const Height = scale(90)
    const { setMarkedPlace, token } = useAppContext();
    const removeFriend = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${api.url}friends/${userID}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirmation",
      `Êtes-vous sûr de vouloir supprimer ${data.name} en tant qu'ami?`,
      [
        {
          text: "Non",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OUI", onPress: () => {removeFriend()} }
      ]
    );
    return (
        <Card style={{
            height: scale(120),
            width: scale(280),
            borderRadius: scale(2),
            padding: scale(2),
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <View style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image 
                    source={ data.photo!='default.jpg' ? {uri: `${api.url_photo}User/${data.photo}`} : Images.emptyprofil}
                    style={{
                        width: Width,
                        height: Height,
                        borderRadius: Radius,
                    }}
                />
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                margin: scale(2)
            }}>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent:'space-between'
                }}>
                    <Text style={{
                        marginLeft: scale(5),
                        color: Colors.grey2
                    }} >
                        {data.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setMarkedPlace({
                              lng:  parseFloat(data.lat),
                              lat: parseFloat(data.lng),
                              namee: data.name,
                            })
                            navigation.navigate('Maps')
                          }}
                        style={{ margin: scale(15) }}>
                        <Image
                            source={Images.mapTabIcon2}
                            style={{
                                width: scale(30),
                                height: scale(30)
                            }} />
                    </TouchableOpacity>
                </View>
                <Dash
                    dashGap={4}
                    dashThickness={1}
                    dashColor={Colors.tabColor}
                    style={{ width: scale(160), height: 1 }} />
                <View style={{ flexDirection: 'column', flex: 2, }}>
                <Text style={{ color: Colors.grey1,  marginTop:scale(10), fontSize:scale(12), marginLeft:scale(5), width:scale(150) , height: scale(30)}}>
                    <Text style={{color: Colors.grey2, fontSize:scale(12), fontWeight:'bold'}}>Address: </Text>
                    {data.address}
                    </Text>
                    <View style={{
                            flexDirection:'row',
                            justifyContent:'flex-end',
                            alignItems:'center',
                            width:scale(150) ,
                            height: scale(40),
                            paddingHorizontal:scale(10)
                            }}>
                           
                            <TouchableOpacity 
                            onPress={()=>{createTwoButtonAlert()}}
                            style={{
                                width:scale(50),
                                height:scale(20),
                                borderWidth: 1,
                                borderColor:Colors.red,
                                borderRadius:scale(5),
                                justifyContent:'center',
                                alignItems: 'center',
                                }}>
                                <Text style={{color:Colors.red}}>Delete</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Card>
    )
}