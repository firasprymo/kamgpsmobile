import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from '../constants/Images';






export default function SentFriendRequest(props) {
    return(
        <View style={{flexDirection:'row', width:width, height:scale(60),borderColor: Colors.grey3,borderBottomWidth:1,marginBottom:0.5}}>
            { props.status == 'accepted' && <View style={{flex:0.2,flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                  <AntDesign name='checkcircle' color={Colors.green2} size={scale(16)} />
                  <Text style={{color:Colors.green2, fontSize:scale(12),paddingTop: scale(5)}}>
                    Acceptée
                    </Text>
            </View>}
            { props.status == 'waiting' && <View style={{flex:0.2,flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                  <AntDesign name='clockcircle' color={Colors.yellow} size={scale(16)} />
                  <Text style={{color:Colors.yellow, fontSize:scale(12),paddingTop: scale(5)}}>
                    En attent
                    </Text>
            </View>}
            { props.status == 'rejected' && <View style={{flex:0.2,flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                  <AntDesign name='exclamationcircle' color={Colors.red} size={scale(16)} />
                  <Text style={{color:Colors.red, fontSize:scale(12),paddingTop: scale(5)}}>
                    Refusée
                    </Text>
            </View>}
            <View style={{
                height:scale(30),
                alignSelf: 'center',
                borderLeftWidth:0.5,
              }}></View>
            <View style={{flex:0.6,flexDirection:'column',paddingVertical:scale(5)}}>
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
            <View style={{flex:0.2,flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
              
              { props.status != 'accepted' && 
                    <TouchableOpacity style={{
                            padding:scale(3),
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                            }}>
                                <AntDesign name='closecircleo' color={Colors.red} size={scale(20)} />
              </TouchableOpacity> }
            </View>
            
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
