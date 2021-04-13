import React from 'react';
import { DatePicker, ImageBackground, Animated, Image, StyleSheet, Dimensions, View, Text, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Images } from '../constants/Images';
import Carousel from 'react-native-snap-carousel';
import { useState } from 'react/cjs/react.development';
import { Colors } from '../constants/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Notification(props) {
 
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const _renderCard = ({ item, index }) => {
      return (
        <View
          style={{
          borderRadius: scale(5),
          borderTopRightRadius: scale(12),
          borderTopLeftRadius: scale(12),
          backgroundColor: 'white',
          height: scale(210),
          width: scale(300),
          marginLeft:scale(10),
          marginRight: scale(25),
          elevation: scale(10) }}>
            <Image source={item.photo} style={{
              width: scale(300),
              height: scale(170),
              borderTopRightRadius: scale(12),
              borderTopLeftRadius: scale(12),
            }} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scale(10)}}>
            <View style={{flexDirection: 'column', alignItems:'center', marginHorizontal:scale(40)}}>
            <Text style={{fontSize: scale(12), fontWeight:'bold'}}>{item.title}</Text>
            <Text style={{fontSize: scale(12)}}>{item.address}</Text>
            </View>
            <TouchableOpacity style={{marginTop: scale(5)}}>
            <IconMaterial name='heart-outline' size={scale(25)} />
            </TouchableOpacity>
            </View>
        
      
      </View>

      )
    }
  const _renderItem = ({ item, index }) => {
    if (index !== activeIndex) {
      return (
        <TouchableHighlight
          key={item.id}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{
              width: scale(82),
              height: scale(132),
              borderRadius: scale(10),
              elevation: scale(10),
            }}>
              <Image
                source={item.photo}
                style={{
                  width: scale(85),
                  height: scale(130),
                  borderRadius: scale(12)
                }} />
            </View>
            <Text style={{ color: Colors.grey2, alignSelf: 'center' }}>{item.title}</Text>
          </View>
        </TouchableHighlight>

      )
    }
    else {
      return (
        <TouchableHighlight

          key={item.id}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{
              width: scale(82),
              height: scale(132),
              borderRadius: scale(12),
              elevation: scale(10),
            }}>
              <Image
                source={item.photo}
                style={{
                  justifyContent: "flex-end",
                  width: scale(85),
                  height: scale(130),
                  borderRadius: scale(12)
                }} >
              </Image>
              <Text style={{
                marginTop: scale(-20),
                color: Colors.white,
                alignSelf: 'center',
                fontSize: scale(12),
                fontWeight: 'bold'
              }}>
                {item.title}
              </Text>
            </View>

          </View>
        </TouchableHighlight>
      )
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', marginTop: scale(10) }}>
        <TouchableOpacity style={{ position: 'absolute', left: scale(5), padding: scale(5) }}>
          <AntDesign name='arrowleft' size={30} color='grey' />
        </TouchableOpacity>
        <Text style={{ fontFamily: "EpoqueSeria-BoldItalic", fontSize: scale(25), color: Colors.backgroundColor1 }}>Lorem Ipsum</Text>
      </View>
      <Animated.View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: scale(50) }}>
        <Carousel
          inactiveSlideScale={0.7}
          layout={"default"}
          onSnapToItem={(index) => setActiveIndex(index)}
          data={data}
          sliderWidth={scale(355)}
          itemWidth={scale(90)}
          renderItem={_renderItem} />
      </Animated.View>
      <TouchableOpacity style={{ marginTop: scale(0), alignItems: 'center' }}>
        <Image style={{ width: scale(30), height: scale(30) }} source={Images.mapTabIcon2} />
      </TouchableOpacity>
      <Text style={{
        fontFamily: "EpoqueSeria-BoldItalic",
        fontSize: scale(25),
        color: Colors.backgroundColor1,
        marginLeft: scale(20),
        marginTop: scale(20)
      }}>
        A proximité
      </Text>
      <Animated.View style={{flex: 1, flexDirection: 'row', marginTop: scale(20) }}>
        <Carousel
          layout={"default"}
          onSnapToItem={(index) => setActiveCardIndex(index)}
          data={data}
          sliderWidth={scale(200)}
          itemWidth={scale(300)}
          renderItem={_renderCard}/>
      </Animated.View>

    </View>
  );
}




const { width, heigth } = Dimensions.get('screen')

const data = [
  {
    title: 'Antony lac 1',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    id: '1',
  },
  {
    title: 'plan B',
    photo: Images.food5,
    address: 'Les Berges du lac Restaurant',
    id: '2',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    address: 'Les Berges du lac Restaurant',
    id: '3',
  },
  {
    title: 'planet',
    photo: Images.food5,
    address: 'Les Berges du lac Restaurant',
    id: '4',
  }, {
    title: 'lac 1',
    photo: Images.food1,
    address: 'Les Berges du lac Restaurant',
    id: '5',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    address: 'Les Berges du lac Restaurant',
    id: '6',
  },
  {
    title: 'Six Seven',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    id: '7',
  },
  {
    title: 'planet',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    id: '8',
  }, {
    title: 'lac 1',
    photo: Images.food1,
    address: 'Les Berges du lac Restaurant',
    id: '9',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    address: 'Les Berges du lac Restaurant',
    id: '10',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    address: 'Les Berges du lac Restaurant',
    id: '11',
  },
  {
    title: 'planet',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    id: '12',
  },
]