import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'


export default function EditPlace(props) {

    return (
        <View style={styles.container} >

            <View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('EditCard')}
                    style={{ padding: scale(5) }}>
                    <Feather name='x' size={30} color={Colors.grey2} />
                </TouchableOpacity>
                <View style={{
                    flex: 0.9,
                    height: scale(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: scale(30)
                }} >
                    <Text style={{ color: Colors.grey1, fontWeight: '300', fontSize: scale(18) }}>Modifier un lieu</Text>
                </View>
                <TouchableOpacity
                    style={{ padding: scale(5) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: scale(18), color: Colors.grey2 }}>OK</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                width: scale(260),
                height: scale(45),
                borderWidth: 1,
                borderColor: Colors.grey4,
                borderRadius: scale(5),
                marginTop: scale(70),
                paddingLeft: scale(10)
            }}>
                <TextInput placeholder='Nom' style={{ flex: 1, fontSize: scale(16) }} />
            </View>
            <View style={{
                width: scale(260),
                height: scale(45),
                borderWidth: 1,
                borderColor: Colors.grey4,
                borderRadius: scale(5),
                marginTop: scale(20),
                paddingLeft: scale(10)
            }}>
                <TextInput placeholder='Catégorie' style={{ flex: 1, fontSize: scale(16) }} />
            </View>
            <View style={{
                width: scale(260),
                height: scale(45),
                borderWidth: 1,
                borderColor: Colors.grey4,
                borderRadius: scale(5),
                marginTop: scale(20),
                paddingLeft: scale(10)
            }}>
                <TextInput placeholder='Number' style={{ flex: 1, fontSize: scale(16) }} />
            </View>
            <Text style={{
                color: Colors.grey1,
                fontSize: scale(18),
                alignSelf: 'flex-start',
                marginLeft: scale(20),
                marginTop: scale(30)
            }}>Ajouter une adresse</Text>

            <ImageBackground source={Images.mapCard} style={{ width: width, height: scale(200), marginTop: scale(10) }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('SelectPlace')}
                        style={{
                            width: scale(250),
                            height: scale(50),
                            borderWidth: 1,
                            borderRadius: scale(5),
                            borderColor: Colors.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: scale(14) }}>Lieu sur la carte</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </View>
    );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    headBar: {
        width: width,
        height: scale(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(10)
    },
    image: {
        borderRadius: (Dimensions.get('window').height * 0.3) / 2,
        height: scale(40),
        width: scale(40),
        borderColor: "white",
        borderWidth: 0.8,
    },
})