import React, { useState } from 'react';
import {
  Image, StyleSheet,
  Dimensions, View, Text,
  TextInput, TouchableOpacity,
  Modal
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DirectionInfo from '../components/DirectionInfo';
import SendPosition from '../components/SendPosition';

const apiKey = 'AIzaSyA3SzFNanrcbcb5iPqI8vJBZq6XZ-Aon0o'

export default function Maps(props) {
  const [directionVisible, setDirectionVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mapcontainer}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showUserLocation={true} >
        <Marker coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }} />
      </MapView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.user3}
          />
        </TouchableOpacity>
        <View style={styles.search} >
          <TextInput
            selectionColor={Colors.purple}
            style={{
              flex: 0.9,
              marginLeft: scale(10)
            }} />
          <TouchableOpacity>
            <AntDesign name='search1' size={25} color={Colors.grey2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ++++++++++++++++++++++++++++ this is only for debugging !! +++++++++++++++++++++++++++ */}
      <TouchableOpacity
        onPress={() => setDirectionVisible(true)}
        style={{ backgroundColor: 'aqua', padding: scale(10), borderRadius: 50 }}>
        <Text>Show component</Text>
      </TouchableOpacity>
      {/* ++++++++++++++++++++++++++++ this is only for debugging !! +++++++++++++++++++++++++++ */}

      <View style={{
        alignSelf: 'flex-end',
        margin: scale(10),
        width: scale(50),
        height: scale(100),
        flexDirection: 'column'
      }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            width: scale(50),
            height: scale(50),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '-45deg' }]
          }}>
          <FontAwesome
            name='location-arrow'
            size={scale(40)}
            color={directionVisible ? Colors.tabColor : Colors.grey1} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: scale(50),
          height: scale(50),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons
            name='crosshairs-gps'
            size={scale(40)}
            color={directionVisible ? Colors.tabColor : Colors.grey1} />
        </TouchableOpacity>
      </View>
      <DirectionInfo
        close={() => setDirectionVisible(false)}
        visible={directionVisible}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SendPosition
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </Modal>

    </View>
  );
}

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
  header: {
    position: 'absolute',
    width: width,
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    top: scale(0),
  },
  search: {
    backgroundColor: 'white', flex: 0.9,
    height: scale(35),
    borderRadius: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: scale(5),
  },
})