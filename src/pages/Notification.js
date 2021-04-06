import React from 'react';
import { ImageBackground,Animated , Image, StyleSheet, Dimensions, View, Text, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Images } from '../constants/Images';


export default function Notification(props) {

  const scrollX = React.useRef(new Animated.Value(0)).current ;
  const Item_Size = scale(100)
  

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', marginTop: scale(10) }}>
        <TouchableOpacity style={{ position: 'absolute', left: scale(5), padding: scale(5) }}>
          <AntDesign name='arrowleft' size={30} color='grey' />
        </TouchableOpacity>
        <Text style={{ fontFamily: "EpoqueSeria-BoldItalic", fontSize: scale(25) }}>Lorem Ipsum</Text>
      </View>

      <View style={{marginTop: scale(50)}}>
        <Animated.FlatList
          onScroll= {Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
          )}
          horizontal
          ItemSeparatorComponent={
            Platform.OS == 'android' &&
            (({ highlighted }) => (
              <View
                style={[ {width: scale(15)} ,
                  highlighted && { marginLeft: 0 }
                ]}
              />
            ))
          }
          data={data}
          renderItem={({ item, index, separators }) => {
            const inputRange = [
              0,
              -1,
              Item_Size * index,
              Item_Size * (index + 2)
            ]
            const xscale = scrollX.interpolate({
              inputRange,
              outputRange: [1,1,1,0]
            })
            return(
              <Animated.View
                style={{transform: [{xscale}]}}
              >
            <TouchableHighlight
              key={item.id}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{
                  width:scale(102),
                  height: scale(152),
                  borderRadius: scale(10),
                  elevation: scale(10),
                  }}>
                <Image
                  source={item.photo}
                  style={{width:scale(100),
                  height: scale(150),
                  borderRadius: scale(12)
                  }} />
                  </View>
                <Text style={{alignSelf: 'center'}}>{item.title}</Text>
              </View>
            </TouchableHighlight>
            </Animated.View>
          )}
        }
        />
      </View>

    </View>
  );
}

const { width, heigth } = Dimensions.get('screen')

const data = [
  {
    title: 'lac 1',
    photo: Images.food1,
    id: '1',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    id: '2',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    id: '3',
  },
  {
    title: 'planet',
    photo: Images.food4,
    id: '4',
  },{
    title: 'lac 1',
    photo: Images.food1,
    id: '5',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    id: '6',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    id: '7',
  },
  {
    title: 'planet',
    photo: Images.food4,
    id: '8',
  },{
    title: 'lac 1',
    photo: Images.food1,
    id: '9',
  },
  {
    title: 'plan B',
    photo: Images.food2,
    id: '10',
  },
  {
    title: 'lac 2',
    photo: Images.food3,
    id: '11',
  },
  {
    title: 'planet',
    photo: Images.food4,
    id: '12',
  },
]