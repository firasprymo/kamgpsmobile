import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, RefreshControl, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Images } from '../constants/Images';
import SentLocationRequest from '../components/SentLocationRequest';
import SentFriendRequest from '../components/SentFriendRequest';
import RecievedLocationRequest from '../components/RecievedLocationRequest';
import RecievedFriendRequest from '../components/RecievedFriendRequest';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Notification(props) {

  const [ tab, setTab ] = useState('1')
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log('refreshing')
    wait(2000).then(() => setRefreshing(false));
  }, []);
 
    return(
        <View style={{backgroundColor:'white', flex:1}}>
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
          Notification
              </Text>
      </View>
      <View
        style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems: 'center',
          paddingTop: scale(20),
          paddingBottom: scale(20),
        }}
      >
          <TouchableOpacity
                        onPress={()=>{setTab('1')}}
                        style={{
                            backgroundColor: tab=='1' ? Colors.green2 : 'white',
                            width: scale(110),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: tab=='1' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Reçu
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{setTab('2')}}
                        style={{
                            backgroundColor: tab=='2' ? Colors.green2 : 'white',
                            width: scale(110),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: tab=='2' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Envoyée
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('RequestPosition')}
                      style={{
                        backgroundColor: Colors.logoBlue,
                        width: scale(35),
                        height:scale(30),
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:3,
                        borderRadius: scale(5),
                        marginLeft:scale(20)
                    }}>
                      <FontAwesome
          name='location-arrow'
          size={scale(20)}
          color={Colors.white}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('AddFriend')}
                      style={{
                        backgroundColor: Colors.logoBlue,
                        width: scale(35),
                        height:scale(30),
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:3,
                        borderRadius: scale(5),
                        marginLeft:scale(10)
                    }}>
                      <MaterialCommunityIcons name='account-multiple-plus' color={Colors.white} size={scale(20)} />
                    </TouchableOpacity>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />}
      >
        { tab=='2' && sentData.map((el,index)=> el.type == 'location' ?
          <SentLocationRequest key={index} status={el.status} name={el.name} date={el.date} phone={el.phone } /> :
          <SentFriendRequest key={index} status={el.status} name={el.name} date={el.date} phone={el.phone } />
        ) }
        { tab=='1' && recievedData.map((el,index)=> el.type == 'location' ?
          <RecievedLocationRequest key={index} name={el.name} date={el.date} phone={el.phone } /> :
          <RecievedFriendRequest key={index} name={el.name} date={el.date} phone={el.phone } />
        ) }
      </ScrollView>
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')

const sentData=[
  { 
    type:'location',
    status:'accepted',
    date:'Now',
    name:'Abdesslam',
    phone:'+216256655418'
  },
  {
    type:'location',
    status:'waiting',
    date:'1 Hour ago',
    name:'Layla',
    phone:'+216266540117'
  },
  {
    type:'location',
    status:'rejected',
    date:'2 Hours ago',
    name:'Sarah',
    phone:'+216266002218'
  },
  { 
    type:'friend',
    status:'accepted',
    date:'Now',
    name:'Abdesslam',
    phone:'+216256655418'
  },
  {
    type:'friend',
    status:'waiting',
    date:'1 Hour ago',
    name:'Layla',
    phone:'+216266540117'
  },
  {
    type:'friend',
    status:'rejected',
    date:'2 Hours ago',
    name:'Sarah',
    phone:'+216266002218'
  },
]
const recievedData = [
  {
    type:'location',
    date:'1 Hour ago',
    name:'Layla',
    phone:'+216266540117'
  },
  {
    type:'location',
    date:'2 Hours ago',
    name:'Sarah',
    phone:'+216266002218'
  },
  {
    type:'friend',
    date:'1 Hour ago',
    name:'Layla',
    phone:'+216266540117'
  },
  {
    type:'friend',
    date:'2 Hours ago',
    name:'Sarah',
    phone:'+216266002218'
  },
]