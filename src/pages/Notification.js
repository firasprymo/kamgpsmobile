import React from 'react';
import {
  Animated, Image,
  Dimensions,
  View, Text, TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import Carousel from 'react-native-snap-carousel';
import { useState } from 'react/cjs/react.development';
import { Colors } from '../constants/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { Content } from 'native-base';


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
          height: scale(220),
          width: scale(300),
          marginLeft: scale(10),
          marginRight: scale(25),
          marginBottom: scale(20),
          elevation: scale(10)
        }}>
        <Image source={item.photo} style={{
          width: scale(300),
          height: scale(170),
          borderTopRightRadius: scale(12),
          borderTopLeftRadius: scale(12),
        }} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: scale(10)
        }}>
          <View style={{
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-between',
            marginRight: scale(20)
          }}>
            <TouchableOpacity
              onPress={() => alert(item.title)}
              style={{ margin: scale(5) }}>
              <Image
                source={Images.mapTabIcon2}
                style={{ width: scale(25), height: scale(25) }} />
            </TouchableOpacity>
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: scale(2)
            }}>
              <Text style={{ color: Colors.tabColor }}>Min</Text>
              <Text style={{ color: Colors.tabColor }}>
                {item.duration}
              </Text>
            </View>
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: scale(2)
            }}>
              <Text style={{ color: Colors.tabColor }}>Km</Text>
              <Text style={{ color: Colors.tabColor }}>
                {item.distance}
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: scale(5)
          }}>
            <Text style={{ fontSize: scale(10), fontWeight: 'bold' }}>
              {item.address}
            </Text>
          </View>
          <TouchableOpacity style={{ marginTop: scale(5) }}>
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
            <Text style={{
              color: Colors.grey2,
              alignSelf: 'center'
            }}>
              {item.title}
            </Text>
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
          Lorem Ipsum
              </Text>
      </View>
      <Content>
        <Animated.View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: scale(10)
              }}>
          <Carousel
            inactiveSlideScale={0.7}
            layout={"default"}
            onSnapToItem={(index) => setActiveIndex(index)}
            data={fooddata}
            sliderWidth={scale(355)}
            itemWidth={scale(90)}
            renderItem={_renderItem} />
        </Animated.View>
        <TouchableOpacity style={{
            marginTop: scale(0),
            alignItems: 'center'
            }}>
          <Image style={{
              width: scale(30),
              height: scale(30)
              }} 
              source={Images.mapTabIcon2}
              />
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
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: scale(20)
            }}>
          <Carousel
            layout={"default"}
            onSnapToItem={(index) => setActiveCardIndex(index)}
            data={hospitaldata}
            sliderWidth={scale(200)}
            itemWidth={scale(300)}
            renderItem={_renderCard} />
        </Animated.View>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
          marginLeft: scale(20),
          marginTop: scale(20)
        }}>
          A proximité
      </Text>
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: scale(20)
            }}>
          <Carousel
            layout={"default"}
            onSnapToItem={(index) => setActiveCardIndex(index)}
            data={policedata}
            sliderWidth={scale(200)}
            itemWidth={scale(300)}
            renderItem={_renderCard} />
        </Animated.View>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
          marginLeft: scale(20),
          marginTop: scale(20)
        }}>
          A proximité
      </Text>
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: scale(20)
            }}>
          <Carousel
            layout={"default"}
            onSnapToItem={(index) => setActiveCardIndex(index)}
            data={fooddata}
            sliderWidth={scale(200)}
            itemWidth={scale(300)}
            renderItem={_renderCard} />
        </Animated.View>
      </Content>
    </View>
  );
}




const { width, heigth } = Dimensions.get('screen')

const fooddata = [
  {
    title: 'Antony lac 1',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '1',
  },
  {
    title: 'plan B',
    photo: Images.food5,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '2',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '3',
  },
  {
    title: 'planet',
    photo: Images.food5,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '4',
  }, {
    title: 'lac 1',
    photo: Images.food1,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '5',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '6',
  },
  {
    title: 'Six Seven',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '7',
  },
  {
    title: 'planet',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '8',
  }, {
    title: 'lac 1',
    photo: Images.food1,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '9',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '10',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '11',
  },
  {
    title: 'planet',
    photo: Images.food4,
    address: 'Les Berges du lac Restaurant',
    duration: '44',
    distance: '8.6',
    id: '12',
  },
]

const policedata = [
  {
    title: 'Police',
    photo: Images.police1,
    address: 'Hopital General de Kinshasa',
    duration: '44',
    distance: '8.6',
    id: '1',
  },
  {
    title: 'Police',
    photo: Images.police2,
    address: 'Hopital General de Kinshasa',
    duration: '44',
    distance: '8.6',
    id: '2',
  }
]
const hospitaldata = [
  {
    title: 'Hopital',
    photo: Images.hospital2,
    address: 'Hopital General de Kinshasa',
    duration: '44',
    distance: '8.6',
    id: '1',
  },
  {
    title: 'Hopital',
    photo: Images.hospital1,
    address: 'Hopital General de Kinshasa',
    duration: '44',
    distance: '8.6',
    id: '2',
  }
]