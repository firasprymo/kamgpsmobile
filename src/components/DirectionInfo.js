import { Col, Row, Tab, TabHeading, Tabs, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import Ionicons from 'react-native-vector-icons/Ionicons'



export default function DirectionInfo(props) {

    const [directionType, setDirectionType] = useState('1')

    if (props.visible != true) return null
    else return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: scale(5)
            }}>
                <View style={styles.modal}>
                </View>
                <TouchableOpacity
                    onPress={() => setDirectionType('1')}
                    style={{
                        marginLeft: scale(5),
                        width: scale(30),
                        height: scale(30),
                        borderRadius: scale(40),
                        backgroundColor: directionType == '1' ? Colors.tabColor : Colors.grey3,
                        elevation: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>
                    <Ionicons
                        name='man-sharp'
                        size={20}
                        color={directionType == '1' ? 'white' : Colors.grey1}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDirectionType('2')}
                    style={{
                        marginLeft: scale(5),
                        width: scale(30),
                        height: scale(30),
                        borderRadius: scale(40),
                        backgroundColor: directionType == '2' ? Colors.tabColor : Colors.grey3,
                        elevation: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>
                    <FontAwesome
                        name='car'
                        size={20}
                        color={directionType == '2' ? 'white' : Colors.grey1}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDirectionType('3')}
                    style={{
                        marginLeft: scale(5),
                        width: scale(30),
                        height: scale(30),
                        borderRadius: scale(40),
                        backgroundColor: directionType == '3' ? Colors.tabColor : Colors.grey3,
                        elevation: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>
                    <FontAwesome
                        name='motorcycle'
                        size={20}
                        color={directionType == '3' ? 'white' : Colors.grey1}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                width: width,
                height: scale(150),
                backgroundColor: 'white',
                justifyContent: 'space-between'
            }}>

                <View style={{
                    flexDirection: 'row',
                    width: width,
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity style={{
                        marginRight: scale(10),
                    }}
                        onPress={() => props.close()} >
                        <Feather name='x' size={25} color={Colors.grey2} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(14),
                        width: scale(270),
                        alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>
                        Adress: {" "}
                        <Text
                            style={{
                                fontSize: scale(12),
                                fontWeight: 'normal',
                                color: Colors.grey1
                            }}>
                            Lorem Ipsum is simply a dummy text
                            of the printing and typesetting industry
                        </Text>
                    </Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: scale(10)
                }}>
                    <TouchableOpacity style={{
                        width: scale(100),
                        height: scale(60),
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={Images.mapTabIcon1}
                            style={{
                                width: scale(30),
                                height: scale(30)
                            }} />
                        <Text style={{
                            fontSize: scale(12)
                        }}>
                            Itineraire
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: scale(100),
                        height: scale(60),
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Ionicons name='heart-outline' size={30} color={Colors.grey2} />
                        <Text style={{ fontSize: scale(12) }}>Engistrer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: scale(100),
                        height: scale(60),
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Ionicons name='call-outline' size={30} color={Colors.grey2} />
                        <Text style={{ fontSize: scale(12) }}>
                            Appeler
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                bottom: scale(115),
                marginLeft: scale(10)
            }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={Images.user3}
                    />
                </View>
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: scale(10)
                }}>
                    <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(18)
                    }}>Min</Text>
                    <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(18)
                    }}>
                        30
                                        </Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: scale(10)
                }}>
                    <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(18)
                    }}>
                        Km
                                        </Text>
                    <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(18)
                    }}>
                        5.3
                                    </Text>
                </View>
            </View>
        </View>
    )
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: width,

    },
    modal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderTopLeftRadius: 30,
        paddingHorizontal: scale(15),
        width: scale(220),
        backgroundColor: 'white',
        height: scale(40),
        marginBottom: -1,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.05)',
        marginLeft: -3,

    },
    imageContainer: {
        height: scale(50),
        width: scale(50),
        borderRadius: (Dimensions.get('window').height * 0.3) / 2,
        alignItems: 'center',
        margin: 8,
        elevation: 5,
    },
    image: {
        borderRadius: (Dimensions.get('window').height * 0.3) / 2,
        height: scale(50),
        width: scale(50),
        borderColor: "white",
        borderWidth: 0.8,
    },
})