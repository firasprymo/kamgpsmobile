import React,{ useState } from 'react';
import {
  Animated, Image,
  Dimensions,
  View, Text, TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import Carousel from 'react-native-snap-carousel';
import { Colors } from '../constants/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { Content } from 'native-base';
import {hospitaldata,Fooddata,policedata,pharmaciedata} from './FoodData';


export default function Proximite(props) {

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
            flex: 0.3,
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
            marginHorizontal: scale(5),
            flex:0.6
          }}>
            <Text style={{ fontSize: scale(10), fontWeight: 'bold' }}>
              {item.address}
            </Text>
          </View>
          <TouchableOpacity style={{flex:0.1, marginTop: scale(5) }}>
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
          A proximité
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
            data={Fooddata}
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
        <View style={{flexDirection:'row', 
          marginLeft: scale(20),
          marginTop: scale(20),
          justifyContent:'space-between',
          alignItems:'center'
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
        
        }}>
          Urgence
      </Text>
      <TouchableOpacity style={{
        marginRight:scale(20),
        elevation:5,
        backgroundColor:'white',
        padding:scale(5),
        borderRadius: scale(10)
      }}
        onPress={()=>props.navigation.navigate('VoirTout',{type:'Urgence'})}
      >
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(16),
          color: Colors.backgroundColor1,
        }}>
          Voir tout</Text>
      </TouchableOpacity>
      </View>
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
        <View style={{flexDirection:'row', 
          marginLeft: scale(20),
          marginTop: scale(20),
          justifyContent:'space-between',
          alignItems:'center'
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
        
        }}>
          Postes polices
      </Text>
      <TouchableOpacity style={{
        marginRight:scale(20),
        elevation:5,
        backgroundColor:'white',
        padding:scale(5),
        borderRadius: scale(10)
      }}
      onPress={()=>props.navigation.navigate('VoirTout',{type:'Postes polices'})}
      >
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(16),
          color: Colors.backgroundColor1,
        }}>
          Voir tout</Text>
      </TouchableOpacity>
      </View>
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
        <View style={{flexDirection:'row', 
          marginLeft: scale(20),
          marginTop: scale(20),
          justifyContent:'space-between',
          alignItems:'center'
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
        
        }}>
          Pharmacie
      </Text>
      <TouchableOpacity style={{
        marginRight:scale(20),
        elevation:5,
        backgroundColor:'white',
        padding:scale(5),
        borderRadius: scale(10)
      }}
      onPress={()=>props.navigation.navigate('VoirTout',{type:'Pharmacie'})}
      >
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(16),
          color: Colors.backgroundColor1,
        }}>
          Voir tout</Text>
      </TouchableOpacity>
      </View>
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: scale(20)
            }}>
          { <Carousel
            layout={"default"}
            onSnapToItem={(index) => setActiveCardIndex(index)}
            data={pharmaciedata}
            sliderWidth={scale(200)}
            itemWidth={scale(300)}
            renderItem={_renderCard} /> }
        </Animated.View>
        <View style={{flexDirection:'row', 
          marginLeft: scale(20),
          marginTop: scale(20),
          justifyContent:'space-between',
          alignItems:'center'
          }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1,
        
        }}>
          Autre
      </Text>
      <TouchableOpacity style={{
        marginRight:scale(20),
        elevation:5,
        backgroundColor:'white',
        padding:scale(5),
        borderRadius: scale(10)
      }}>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(16),
          color: Colors.backgroundColor1,
        }}
        onPress={()=>props.navigation.navigate('VoirTout',{type:'Autre'})}
        >
          Voir tout</Text>
      </TouchableOpacity>
      </View>
        <Animated.View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: scale(20)
            }}>
          { <Carousel
            layout={"default"}
            onSnapToItem={(index) => setActiveCardIndex(index)}
            data={Fooddata}
            sliderWidth={scale(200)}
            itemWidth={scale(300)}
            renderItem={_renderCard} /> }
        </Animated.View>
      </Content>
    </View>
  );
}




const { width, heigth } = Dimensions.get('screen')

