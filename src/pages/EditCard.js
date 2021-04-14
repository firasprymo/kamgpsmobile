import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Content, Row } from 'native-base';
import Swipeable from 'react-native-swipeable';
import Animated from 'react-native-reanimated';




export default function EditCard(props) {

    const deleteNotif = (item) => {
        let newList = notifList.filter((el)=>{
            if (el.id == item.id) {
                return false
            } 
            else return true
        })
        setNotifList(newList)
    }
    

    const [ notifList, setNotifList ] = useState(data)

    const rightButtons = (item) => [
        <TouchableOpacity onPress= {()=> {deleteNotif(item)} } style={styles.button} >
            <Image source={Images.cancel} style={{width:scale(25), height: scale(25)}} />
        </TouchableOpacity>,
        <TouchableOpacity onPress={() => props.navigation.navigate('EditPlace')} style={styles.button} >
            <Image source={Images.pencil} style={{width:scale(30), height: scale(30)}} />
        </TouchableOpacity>
    ];

    return (
        <View style={styles.container} >

            <View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('contribution')}
                    style={{ padding: scale(5) }}>
                    <AntDesign name='arrowleft' size={30} color='grey' />
                </TouchableOpacity>
                <View style={{
                    flex: 0.9,
                    height: scale(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: scale(30)
                }} >
                    <Text style={{ color: Colors.grey1, fontWeight: '300', fontSize: scale(18) }}>Modifier votre carte</Text>
                </View>
            </View>
            <Content style={{ paddingTop: scale(20) }}>
                <Animated.View>
                    {notifList.map((item)=>(
                        <Swipeable
                        key= {item.id}
                        style={{
                            width: scale(330),
                            height: scale(90),
                        }}
                        rightButtons={rightButtons(item)}>
                        <View style={{
                            width: scale(310),
                            height: scale(70),
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: scale(10),
                            backgroundColor: 'white',
                            borderRadius: scale(15),
                            marginLeft: scale(5),
                            alignSelf: 'center',
                            marginTop: scale(5),
                            flexDirection: 'row'
                        }}>
                            <Image
                                style={styles.image}
                                source={item.photo}
                            />
                            <View style={{
                                flex: 0.7,
                                flexDirection: 'column',
                                alignItems: 'center',
                                paddingHorizontal: scale(10)
                            }}>
                                <Text style={{
                                    color: Colors.grey2,
                                    fontWeight: '200',
                                    fontSize: scale(15)
                                }}>
                                    {item.title}
                    </Text>
                                <Text style={{
                                    color: Colors.grey1,
                                    fontWeight: '100',
                                    fontSize: scale(12)
                                }}>
                                    {item.description}
                    </Text>
                            </View>
                            <TouchableOpacity style={{
                                flex: 0.15,
                            }}>
                                <Image source={Images.telephone} style={{width:scale(30), height: scale(30)}} />
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                    ))}
                
                </Animated.View>

            </Content>


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
        flex: 0.15,
        marginLeft: scale(5)
    },
    button: {
        backgroundColor: null,
        width: scale(50),
        height: scale(50),
        marginTop: scale(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const data = [
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user3,
        id: '1'
    },
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user2,
        id: '2'
    },
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user3,
        id: '3'
    },
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user2,
        id: '4'
    },
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user3,
        id: '5'
    },
    {
        title: 'Lorem',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        photo: Images.user2,
        id: '6'
    },
]