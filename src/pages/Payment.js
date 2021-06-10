import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Content, Radio, Row } from 'native-base';
import Swipeable from 'react-native-swipeable';
import Animated from 'react-native-reanimated';
import TextButton from '../components/TextButton';
import AddPaymentMethod from '../components/AddPaymentMethod';
import { WebView } from 'react-native-webview'



export default function Payment(props) {
    const close = () => {
     setModalVisible(false)
    }
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ paymentType, setPaymentType ] = useState('1')
    const [ checked, setChecked ] = useState('0')
    const [ displayWebview, setDisplayWebview ] = useState(false)
    return (
        <View style={styles.container} >
            <View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Profil')}
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
                    <Text style={{
                        color: Colors.welcomeColor2,
                        fontWeight: '300',
                        fontSize: scale(26),
                        fontFamily: 'BredaTwo-Light'
                    }}>Paiement</Text>
                </View>
            </View>
            
            <Row style={{
                marginTop: scale(50),
                height: scale(35)
            }}>
                <Col>
                    <TouchableOpacity 
                        onPress={()=> setPaymentType('1')}
                        style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: scale(20), color: paymentType=='1' ? Colors.welcomeColor2 :Colors.grey1 }} >User 1</Text>
                    </TouchableOpacity>
                </Col>
                <Col>
                <TouchableOpacity 
                        onPress={()=> setPaymentType('2')}
                        style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: scale(20), color: paymentType=='2' ? Colors.welcomeColor2 :Colors.grey1 }} >User 2</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
            <Content style={{
                flex: 1,
                backgroundColor: Colors.grey3,
                width: width
            }} >
                <View style={styles.card}>
                    <View style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: scale(20),
                        marginBottom: scale(10)
                        }}>
                        <Text style={{
                            color: Colors.grey1
                        }} >Selecte</Text>
                        <TextButton
                            title="Tout"
                            color={Colors.purple}
                            fontWeight='bold'
                            onPress={() => setModalVisible(true)}
                        />
                    </View>
                    <TouchableOpacity style={styles.radio}
                        onPress={() => setChecked('1')}>
                        <Image source={Images.visa} resizeMode='contain' style={styles.image} />
                        <Text style={{ color: Colors.grey1, marginHorizontal: scale(10), fontSize: scale(10) }}>**** **** **** 2187</Text>
                        <Radio selected={checked == '1'}
                            color={Colors.purple}
                            selectedColor={Colors.purple}
                            disabled
                            style={{ position: 'absolute', right: scale(5) }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radio}
                        onPress={() => setChecked('2')}>
                        <Image source={Images.paypal} resizeMode='contain' style={styles.image} />
                        <Text style={{ color: Colors.grey1, marginHorizontal: scale(10), fontSize: scale(10) }}>johndoe@email.com</Text>
                        <Radio selected={checked == '2'}
                            color={Colors.purple}
                            selectedColor={Colors.purple}
                            disabled
                            style={{ position: 'absolute', right: scale(5) }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radio}
                        onPress={() => setChecked('3')}>
                        <Image source={Images.masterCard} resizeMode='contain' style={styles.image} />
                        <Text style={{ color: Colors.grey1, marginHorizontal: scale(10), fontSize: scale(10) }}>johndoe@email.com</Text>
                        <Radio selected={checked == '3'}
                           color={Colors.purple}
                           selectedColor={Colors.purple}
                            disabled
                            style={{ position: 'absolute', right: scale(5) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            paddingHorizontal: scale(10),
                            height: scale(30),
                            alignItems: 'center'
                                }}>
                        <Text>Total</Text>
                        <Text>$9.99</Text>
                    </View>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            paddingHorizontal: scale(10),
                            height: scale(30),
                            alignItems: 'center',
                            borderBottomColor: Colors.grey4,
                            borderBottomWidth: 1
                            }}>
                        <Text>Remise</Text>
                        <Text>-$4</Text>
                    </View>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            paddingHorizontal: scale(10),
                            height: scale(30),
                            alignItems: 'center'
                                }}>
                        <Text>Total</Text>
                        <Text>$5.99</Text>
                    </View>
                </View>
                <View style={{backgroundColor: Colors.white, padding: scale(10), marginTop: scale(10)}}>
                <TouchableOpacity 
                onPress={() => setModalVisible(true)}
                style={{
                        width: scale(250),
                        height: scale(50),
                        borderWidth: 1,
                        borderRadius: scale(5),
                        borderColor: Colors.purple,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>
                        <Text style={{color: Colors.purple, fontSize: scale(14)}}>Effectuer paiement</Text>
                    </TouchableOpacity>
                </View>
            </Content>
            <Modal
            presentationStyle='overFullScreen'
            statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
          <AddPaymentMethod close={close} />
      </Modal>
 
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
        width: scale(35),
        height: scale(20),
    },
    radio: {
        alignSelf: 'center',
        width: scale(260),
        height: scale(35),
        borderWidth: 0.5,
        borderColor: Colors.grey4,
        borderRadius: scale(5),
        marginTop: scale(10),
        backgroundColor: Colors.grey3,
        paddingHorizontal: scale(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        flexDirection: 'column',
    backgroundColor: Colors.white,
    marginTop: scale(10),
    padding: scale(5),
    paddingBottom: scale(20)
        }
})

