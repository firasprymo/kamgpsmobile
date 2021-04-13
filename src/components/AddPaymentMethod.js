import { Col, Row, Tab, TabHeading, Tabs, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../constants/Colors';




export default function AddPaymentMethod(props) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (



    <View style={styles.modalView}>
      <View style={styles.modal}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.grey3, borderBottomWidth: 1, paddingBottom: scale(15) }}>
          <Text style={{ marginTop: scale(10), fontSize: scale(13), fontWeight: 'bold' }}>Ajouter carte de credit/débit</Text>
          <TouchableOpacity style={{
            marginRight: scale(-5)
          }}
            onPress={() => props.close()} >
            <Feather name='x' size={25} color={Colors.grey2} />
          </TouchableOpacity>
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(20),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='Numéro de carte' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: scale(20), alignItems:'center'}}>
            <Text style={{color: Colors.grey1}}>Date expiration</Text>
            <View style={{backgroundColor: Colors.grey3, width: scale(70), height:scale(40), borderRadius: scale(20), alignItems:'center'}}>
              <TextInput maxLength={2} placeholder='MM' keyboardType='number-pad' />
            </View>
            <View style={{backgroundColor: Colors.grey3, width: scale(70), height:scale(40), borderRadius: scale(20), alignItems:'center'}}>
            <TextInput maxLength={2} placeholder='YY' keyboardType='number-pad' />
            </View>
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(20),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='CVV' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(10),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='Nom' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(10),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='Prénom' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between',marginTop: scale(20)}}>
        <Text style={{color: Colors.grey1, fontSize: scale(12)}}>Vous pouvez retirer votre</Text>
        <Switch
        trackColor={{ false: Colors.grey3, true: Colors.logoBlue }}
        thumbColor={isEnabled ? Colors.welcomeColor3 : Colors.grey1}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
        <TouchableOpacity style={{
          marginTop: scale(20),
          width: scale(280),
          height: scale(40),
          borderWidth:1,
          borderRadius: scale(10),
          borderColor: Colors.tabColor,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
            <Text style={{color: Colors.tabColor}} > Pays </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  modalView: {
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width,
    justifyContent: 'flex-end',

  },
  modal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    paddingHorizontal: scale(15),
    paddingTop: scale(5),
    elevation: 5,
    width: width,
    backgroundColor: 'white',
    paddingBottom: scale(50),
    height: scale(600),

  }

})