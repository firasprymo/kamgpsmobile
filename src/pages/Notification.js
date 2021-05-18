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
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Notification(props) {

  const {token, currentUser} = useAppContext()
  const [ tab, setTab ] = useState('1')
  const [refreshing, setRefreshing] = React.useState(false);
  const [ sentRequests, setSentRequests ] = React.useState([])
  const [ recievedRequests, setRecievedRequest ] = useState([])


  

  const getData = (DATA) => {
    const newSentRequests = []
    const newRecievedRequests = []
    const data = DATA.data.data
    data.map((el)=>{
      // console.log(el)
      if (el.idSender.id == currentUser.id ) {
        // console.log(el.idReciverd)
        newSentRequests.push({
        type: el.setLocationByfriend == 'location' ? 'location' : 'friend',
        status: el.status=='accepter' ?'accepted': el.status == 'encours' ? 'waiting' : 'rejected',
        date: moment(el.createdAt).fromNow() ,
        name: el.idReciverd.name,
        phone: el.idReciverd.phonenumber,
        id: el._id,
        lat: el.location.lat,
        lng: el.location.lng
      } )
    } else {
      // console.log(el.idSender)
      newRecievedRequests.push({
      type: el.setLocationByfriend == 'location' ? 'location' : 'friend',
      status: el.status=='accepter' ?'accepted': el.status == 'encours' ? 'waiting' : 'rejected',
      date: moment(el.createdAt).fromNow() ,
      name: el.idSender.name,
      phone: el.idSender.phonenumber,
      id: el._id,
      idfriend: el.idSender.id,
    } )
    }
    })
    setSentRequests(newSentRequests.reverse())
    setRecievedRequest(newRecievedRequests.reverse())
  }
  const refresh = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${api.url}friends/listeNotificationByUser`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result)
    getData(result)
  })
  .catch(error => console.log('error', error));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh()
    console.log('refreshing')
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(()=>{
    refresh()
    const socket = socketIOClient(api.url_SOC);
    socket.on('data', data => {
      console.log("notif socket : ",data)
      if (data) {
        refresh()
        // const prevMessage = {
        //   _id: data?._id,
        //   text: data?.message,
        //   createdAt: data?.createdAt,
        //   user: {
        //     _id: data?.sender,
        //   },
        // };
      }
    })
  },[])
 
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
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />}
      >
        { tab=='2' && sentRequests.map((el,index)=> el.type == 'location' ?
          <SentLocationRequest refresh={refresh} navigation={props.navigation} key={el.id} token={token} id={el.id} {...el} /> :
          <SentFriendRequest refresh={refresh} key={el.id} token={token} id={el.id} {...el} />
        ) }
        { tab=='1' && recievedRequests.map((el,index)=> el.type == 'location' ?
          <RecievedLocationRequest refresh={refresh} key={el.id} currentUser={currentUser} token={token} {...el} /> :
          <RecievedFriendRequest refresh={refresh} key={el.id} currentUser={currentUser} token={token} {...el} />
        ) }
      </ScrollView>
        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')

