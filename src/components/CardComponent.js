import { Card, Text } from 'native-base';
import React from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import Dash from 'react-native-dash'
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';

export default function CardComponent({ data, navigation, refresh }) {

    const Radius = scale(10)
    const Width = scale(110)
    const Height = scale(110)
    const { setMarkedPlace, token } = useAppContext();
    const removePlace = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${api.url}favorites/${data._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                refresh()
                console.log(result)})
            .catch(error => console.log('error', error));
    }
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Confirmation",
            `Êtes-vous sûr de vouloir supprimer ${data.name} de la list de favoris?`,
            [
                {
                    text: "Non",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OUI", onPress: () => { removePlace() } }
            ]
        );
    return (
        <Card style={{
            height: scale(120),
            width: scale(280),
            borderRadius: scale(2),
            padding: scale(2),
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={data.photo != 'default.jpg' ? { uri: `${api.url_photo}Favorite/${data.photo}` } : Images.emptyphoto}
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
                    alignItems: 'center'
                }}>
                    <Text style={{
                        marginLeft: scale(5),
                        color: Colors.grey2,
                        width: scale(100),
                        fontSize: scale(13)
                    }} >
                        {data.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setMarkedPlace({
                                lng: parseFloat(data.location.lng),
                                lat: parseFloat(data.location.lat),
                                namee: data.name,
                            })
                            navigation.navigate('Maps')
                        }}
                        style={{ margin: scale(15) }}>
                        <Image
                            source={Images.mapTabIcon2}
                            style={{
                                width: scale(30),
                                height: scale(30),
                                tintColor: Colors.logoGreen
                            }} />
                    </TouchableOpacity>
                </View>
                <Dash
                    dashGap={4}
                    dashThickness={1}
                    dashColor={Colors.tabColor}
                    style={{ width: scale(160), height: 1 }} />
                <View style={{ flexDirection: 'column', flex: 2, }}>
                    <Text style={{ color: Colors.grey1, marginTop: scale(5), fontSize: scale(12), marginLeft: scale(5), width: scale(150), height: scale(35) }}>
                        <Text style={{ color: Colors.grey2, fontSize: scale(12), fontWeight: 'bold' }}>Address: </Text>
                        {data.addresse}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: scale(150),
                        height: scale(28),
                        paddingHorizontal: scale(10),
                        marginTop: scale(5),
                    }}>
                        <TouchableOpacity
                        onPress={()=>{
                            console.log(data)
                            navigation.navigate('EditPlace',{
                                name: data.name,
                                address: data.addresse,
                                latitude: data.location.lat,
                                longitude: data.location.lng,
                                photo: data.photo != 'default.jpg' ? { uri: `${api.url_photo}Favorite/${data.photo}` } : Images.emptyphoto,
                                category: data.categorie,
                                id: data._id
                                })
                            }}
                        style={{
                            width: scale(50),
                            height: scale(20),
                            borderWidth: 1,
                            borderColor: Colors.logoBlue,
                            borderRadius: scale(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ color: Colors.logoBlue, fontSize:scale(12) }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { createTwoButtonAlert() }}
                            style={{
                                width: scale(50),
                                height: scale(20),
                                borderWidth: 1,
                                borderColor: Colors.red,
                                borderRadius: scale(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: Colors.red, fontSize: scale(12) }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Card>
    )
}