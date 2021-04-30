import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from '../constants/Images';






export default function RecievedFriendRequest(props) {
    return(
        <View style={{flexDirection:'row', width:width, height:scale(60),borderColor: Colors.grey3,borderBottomWidth:1,marginBottom:0.5}}>
            
           
            <View style={{flex:0.7,flexDirection:'column',paddingVertical:scale(5), paddingLeft:scale(20)}}>
            <View style={{flex:0.5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <Text style={{marginLeft:scale(10)}}>{props.name}</Text>
                  <Text style={{marginRight:scale(20)}}>{props.phone} </Text>
            </View>
            <View style={{flex:0.5,flexDirection:'row',paddingLeft:scale(5)}}>
                <MaterialCommunityIcons name='account-plus' size={scale(16)} color={Colors.logoBlue} />
                <Text style={{color:'grey',marginLeft:scale(10),fontSize:scale(12)}} >Friend request</Text>
                <Text style={{color:'grey',marginLeft:scale(10),fontSize:scale(12)}}>{props.date}</Text>
              </View>
            </View>
            <View style={{
                height:scale(40),
                alignSelf: 'center',
                borderLeftWidth:0.5,
              }}></View>
           <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity style={{
                    padding: scale(3),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:Colors.grey3,
                    borderRadius:scale(100),
                    padding:scale(5),
                    elevation:5,
                    marginLeft:scale(10),
                }}>
                    <MaterialCommunityIcons name='account-multiple-plus' color={Colors.logoBlue} size={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    padding: scale(3),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:Colors.grey3,
                    borderRadius:scale(100),
                    padding:scale(5),
                    elevation:5,
                    marginRight:scale(10)
                }}>
                    <MaterialCommunityIcons name='delete-forever' color={Colors.red} size={scale(20)} />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
