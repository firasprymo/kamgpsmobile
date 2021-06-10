import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Contribution(props) {

  return (
    <View style={styles.container} >
      <View style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          marginTop: scale(10),
          paddingBottom: scale(10),
          borderBottomColor:Colors.grey4,
          borderBottomWidth: 0.2,
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1
        }}>
          Contribution
              </Text>
      </View>
      {/* <View style={{
        width: width, height: scale(50), flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        marginTop: scale(10)
      }} >

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.user3}
          />
        </View>
        <View style={{
          backgroundColor: Colors.grey3, flex: 0.9,
          height: scale(40),
          borderRadius: scale(50),
          flexDirection: 'row',
          alignItems: 'center'
        }} >
          <TextInput
            selectionColor={Colors.purple}
            style={{ flex: 0.9, marginLeft: scale(10) }} />
          <TouchableOpacity>
            <AntDesign name='search1' size={25} color={Colors.grey2} />
          </TouchableOpacity>

        </View>
      </View> */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('EditCard')}
        style={{
          width: scale(250),
          height: scale(150),
          backgroundColor: Colors.grey3,
          borderRadius: scale(20),
          marginTop: scale(80),
          elevation: scale(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={Images.pencil} size={scale(50)} />
        <Text style={{ color: Colors.purple, fontSize: scale(22), margin: scale(10) }} >Modifier votre carte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddPlace')}
        style={{
          width: scale(250),
          height: scale(150),
          backgroundColor: Colors.grey3,
          borderRadius: scale(20),
          marginTop: scale(40),
          elevation: scale(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={Images.mapLogo} size={scale(50)} />
        <Text style={{ color: Colors.purple, fontSize: scale(22), margin: scale(10) }} >Ajouter un lieu</Text>
      </TouchableOpacity>

    </View>
  );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    height: scale(44),
    width: scale(40),
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    margin: 8,
    elevation: 10,
  },
  image: {
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    height: scale(40),
    width: scale(40),
    borderColor: "white",
    borderWidth: 0.8,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: scale(20),
    fontFamily: 'MafraDisplay-Book',
    color: Colors.grey2,
  }
})