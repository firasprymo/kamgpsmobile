import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTabBar, Row, Tab, TabHeading, Tabs, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FavouriteComponent from '../components/FavouriteComponent';
import FriendsComponent from '../components/FriendsComponent';
import { api } from '../constants/api_config';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { useAppContext } from '../context/AppContext';
import DropDownPicker from 'react-native-dropdown-picker';


const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Profil(props) {

  const [menu, setMenu] = useState(false)
  const { token, setToken, setCurrentUser } = useAppContext()
  const [currentTab, setCurrentTab] = useState(true)
  const [user, setUser] = useState({ username: '', photo: '' })
  const [refreshing, setRefreshing] = useState(false);
  const [friends, setFriends] = useState({
    count: 0,
    data: []
  })
  const [locations, setLocations] = useState({
    count: 0,
    data: []
  })
  const logout = () => {
    console.log('logout token = ', token)
    AsyncStorage.clear();
    setToken('')
    props.navigation.navigate('Auth')

  }
  const getUserInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${api.url}users/Me`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == 'success') {
          console.log(result)
          setUser({
            username: result.data.data.name,
            photo: result.data.data.photo,
          })
          setCurrentUser({
            username: result.data.data.name,
            photo: result.data.data.photo,
            id: result.data.data.id,
            phone: result.data.data.phonenumber,
          })
        }
      })
      .catch(error => console.log('error', error));
  }

  const getFriends = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${api.url}friends/listeFrends`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.count != undefined) {
          setFriends({
            count: result.count,
            data: result.data
          })
        }
        //console.log(result)
      })
      .catch(error => console.log('error', error));
  }
  const getLocations = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${api.url}favorites/ListeFavoriteUser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.count != undefined) {
          setLocations({
            count: result.count,
            data: result.data
          })
        }
        //console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  const refreshdata = () => {

    getUserInfo()
    getFriends()
    getLocations()
  }

  const onRefresh = React.useCallback(() => {
    console.log("onrefresh ===", locations.data)
    setRefreshing(true);
    refreshdata()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  var tab1Color = Colors.grey1
  var tab2Color = Colors.grey1
  if (currentTab) {
    tab1Color = Colors.tabColor;
  } else {
    tab1Color = Colors.grey1;
  }
  if (!currentTab) {
    tab2Color = Colors.tabColor;
  } else {
    tab2Color = Colors.grey1;
  }

  useEffect(() => {
    if (user.username == '') {


      refreshdata()
    }
  }, [])

//


  return (
    <View style={styles.container}>

        <View style={{height:scale(200)}}>
        <ScrollView 
        refreshControl={
          <RefreshControl
          
            refreshing={refreshing}
            onRefresh={onRefresh} />}
      >
          <View style={{
            flexDirection: 'row',
            width: width,
            alignItems: 'center',
            marginTop: scale(20),
          }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Payment')}
              style={{ paddingHorizontal: scale(10) }}>
              <Ionicons name='card' size={40} color={Colors.tabColor} />
            </TouchableOpacity>
            <View style={{
              position: 'absolute',
              right: scale(0),
              paddingHorizontal: scale(5)
            }}>

              <View style={{ position: 'absolute', flexDirection: 'column', alignItems: 'flex-end', flex: 1, width: scale(100), right: scale(10), top: scale(-10) }}>
                <TouchableOpacity
                  onPress={() => setMenu(!menu)}
                  style={{ height: 40, width: scale(50), borderWidth: 0, backgroundColor: null, alignItems: 'center' }} >
                  <SimpleLineIcons name='settings' size={30} color={Colors.tabColor} />
                </TouchableOpacity>
                  
                {menu && <>
                  <Ionicons style={{marginRight:scale(15), marginBottom:scale(-5)}} size={22} color='white' name='triangle' />
                <View style={{ borderRadius: 5, backgroundColor: 'white', elevation: 5 }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('EditProfil')}
                    style={{ height: 40, width: scale(100), flexDirection: 'row', alignItems: 'center', paddingLeft: scale(3), borderBottomWidth: 0.2 }}>
                    <SimpleLineIcons name='pencil' size={20} color={Colors.tabColor} />
                    <Text style={{ fontSize: scale(11), marginHorizontal: scale(5) }}>Modifier profil</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => logout()}
                    style={{ height: 40, width: scale(100), flexDirection: 'row', alignItems: 'center', paddingLeft: scale(3) }}>
                    <SimpleLineIcons name='logout' size={20} color={Colors.tabColor} />
                    <Text style={{ fontSize: scale(11), marginHorizontal: scale(5) }}>Déconnecter</Text>
                  </TouchableOpacity>
                </View>
                </>
                }
              </View>

            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${api.url_photo}User/${user.photo}` }}
            />
          </View>
          <Text style={styles.nameText}>
            {user.username}
          </Text>
          </ScrollView>
        </View>
    
      
      <Row >
        <Tabs
          renderTabBar={renderTabBar}
          onChangeTab={() => {
            setCurrentTab(!currentTab)
          }}
          tabBarUnderlineStyle={{
            backgroundColor: Colors.tabColor,
            width: scale(130),
            marginHorizontal: scale(25),
            borderRadius: scale(100)
          }} >
          <Tab

            heading={<TabHeading style={{ backgroundColor: 'white' }}>
              <Ionicons name="heart-outline" color={tab1Color} size={20} />
              <Text style={{
                color: tab1Color,
                fontSize: scale(12)
              }} >
                Favourites ({locations.count})
              </Text>
            </TabHeading>}>
            <FavouriteComponent refresh={refreshdata} navigation={props.navigation} data={locations} />
          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: 'white' }}>
              <Ionicons name="people-outline" color={tab2Color} size={20} />
              <Text style={{
                color: tab2Color,
                fontSize: scale(12)
              }}>
                Friends ({friends.count})
              </Text>
            </TabHeading>} >
            <FriendsComponent refresh={refreshdata} navigation={props.navigation} data={friends} />
          </Tab>
        </Tabs>

      </Row>
    </View>
  );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imageContainer: {
    height: scale(84),
    width: scale(80),
    alignSelf: 'center',
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    margin: 8,
    elevation: 10,
  },
  image: {
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    height: scale(80),
    width: scale(80),
    borderColor: "white",
    borderWidth: 0.8,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: scale(20),
    color: Colors.grey2,
    marginTop:scale(5)
  }
})