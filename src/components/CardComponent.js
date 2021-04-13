import { Card, Text } from 'native-base';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import Dash from 'react-native-dash'

export default function CardComponent({type,data}) {

    const Radius = type == 'favourite' ? scale(10) : scale(100)
    const Width = type == 'favourite' ? scale(110) : scale(90)
    const Height = type == 'favourite' ? scale(110) : scale(90)

    return(
            <Card style={{
                    height:scale(120),
                    width:scale(280),
                    borderRadius: scale(2),
                    padding:scale(2),
                    flexDirection:'row',
                    alignItems: 'center'}}>
                        <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                <Image source={data.photo} 
                    style={{width:Width,height:Height, borderRadius: Radius, }}
                />
                </View>
                <View style={{flex: 1, flexDirection:'column', margin:scale(2)}}>
                    <View style={{
                        flexDirection:'row',
                        flex: 1,
                        alignItems:'center' }}>
                        <Text style={{ marginLeft: scale(5),color: Colors.grey2}} >{data.placeName}</Text>
                        <Ionicons
                            style={{position:'absolute', right:scale(2)}}
                            name='heart-outline'
                            size={35}
                            color={Colors.tabColor}
                         />
                    </View>
                    <Dash dashGap={4} dashThickness={1} dashColor={Colors.tabColor} style={{width:scale(160), height:1}}/>
                    <View style={{flexDirection:'row', flex: 2,}}>
                        <TouchableOpacity onPress={()=>alert(data.placeName)} style={{margin: scale(15) }}>
                        <Image source={Images.mapTabIcon2} style={{width:scale(30), height: scale(30)}} />
                        </TouchableOpacity>
                        <View style={{flexDirection: 'column', alignItems: 'center', padding:scale(10)}}>
                            <Text style={{color: Colors.grey1}}>Min</Text>
                            <Text style={{color: Colors.grey1}}>{data.duration}</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', padding:scale(10)}}>
                            <Text style={{color: Colors.grey1}}>Km</Text>
                            <Text style={{color: Colors.grey1}}>{data.distance}</Text>
                        </View>
                    </View>
                </View>
            </Card>
    )
}