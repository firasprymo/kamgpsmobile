import React,{ useState } from 'react';
import {
  Animated, Image,
  Dimensions,
  View, Text, TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import Carousel from 'react-native-snap-carousel';
import { Colors } from '../constants/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { Content } from 'native-base';
import {hospitaldata,Fooddata,policedata,pharmaciedata} from './FoodData';

import AntDesign from 'react-native-vector-icons/AntDesign'



export default function VoirTout(props) {
    const type = props.navigation.getParam('type');
    const data = type=='Urgence' ? hospitaldata : type=='Autre' ? Fooddata : type=='Pharmacie' ? pharmaciedata : policedata

    const _renderCard = (item, index) => {
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
    return(
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          marginTop: scale(10),
          paddingBottom: scale(10),
          borderBottomColor:Colors.grey4,
          borderBottomWidth: 0.2,
          }}>
              <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ padding: scale(5),
                        position:'absolute',
                        left:scale(10),
                        marginTop:scale(-5),
                     }}>
                     <AntDesign name='arrowleft' size={30} color='grey' />
                </TouchableOpacity>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1
        }}>
          {type}
              </Text>
      </View>
      <ScrollView style={{paddingTop:scale(20)}}>
           {data.map((item,ind)=><View
           key={ind}
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
    
    
          </View>)}
      </ScrollView>
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
