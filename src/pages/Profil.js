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

  const [ menu, setMenu ] = useState(false)
  const { token, setToken, setCurrentUser } = useAppContext()
  const [currentTab, setCurrentTab] = useState(true)
  const [user, setUser] = useState({ username:'', photo:'' })
  const [refreshing, setRefreshing] = React.useState(false);
  
  const logout = () => {
    console.log('logout token = ', token)
    AsyncStorage.clear();
    setToken('')
    props.navigation.navigate('Auth')
    
  }
  const refreshdata= () => {
    
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
        if (result.status=='success'){
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

  const onRefresh = React.useCallback(() => {
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

  useEffect(()=>{
    if (user.username=='') {
    
   
      refreshdata()}
  },[])    
  
 


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{marginBottom:scale(-270)}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
       >
         <View >
      <View style={{
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
        marginTop: scale(20)
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
          {/* <DropDownPicker
          arrowStyle={{backgroundColor:null, height: scale(30), alignSelf:'center'}}
          placeholder=''
          customArrowUp={()=><SimpleLineIcons name='settings' size={30} color={Colors.tabColor}/>}
          customArrowDown={()=><SimpleLineIcons name='settings' size={30} color={Colors.tabColor}/>}
          showArrow={true}
    items={[
        {label: '', value: 'pencil', icon: () => 
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <SimpleLineIcons name='pencil' size={20} color={Colors.tabColor}/>
          <Text style={{fontSize: scale(12)}}>Modifier profil</Text>
        </View> 
        },
        {label: '', value: 'déconnecter', icon: () => 
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <SimpleLineIcons name='logout' size={20} color={Colors.tabColor}/>
        <Text style={{fontSize: scale(12)}}>Déconnecter</Text>
      </View> 
      },
    ]}
    
    containerStyle={{height: 40, width: scale(120),borderWidth:0,backgroundColor:null}}
    style={{backgroundColor: null, borderWidth:0}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => 
      {
        console.log(item)
      }
    }
/> */}
<View style={{position: 'absolute',flexDirection:'column', alignItems:'flex-end',flex:1, width:scale(100),right:scale(10), top:scale(-10)}}> 
<TouchableOpacity
onPress={() => setMenu(!menu)}
style={{height: 40, width: scale(50),borderWidth:0,backgroundColor:null,alignItems:'center'}} >
  <SimpleLineIcons name='settings' size={30} color={Colors.tabColor}/>
</TouchableOpacity>
 {  menu && <View style={{borderRadius:5,backgroundColor:'white',elevation:5}}>
<TouchableOpacity 
  onPress={() => props.navigation.navigate('EditProfil')}
  style={{height: 40, width: scale(100),flexDirection:'row', alignItems:'center',paddingLeft:scale(3),borderBottomWidth:0.2}}>
<SimpleLineIcons name='pencil' size={20} color={Colors.tabColor}/>
          <Text style={{fontSize: scale(11),marginHorizontal:scale(5)}}>Modifier profil</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={() => logout()}
style={{height: 40, width: scale(100),flexDirection:'row', alignItems:'center',paddingLeft:scale(3)}}>
<SimpleLineIcons name='logout' size={20} color={Colors.tabColor}/>
        <Text style={{fontSize: scale(11),marginHorizontal:scale(5)}}>Déconnecter</Text>
</TouchableOpacity>
</View>}
</View>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfil')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: scale(10)
            }}>
            <SimpleLineIcons name='pencil' size={25} color={Colors.tabColor} />
            <Text style={{
              color: Colors.tabColor,
              fontSize: scale(10),
              fontWeight: 'bold',
              marginTop: scale(2)
            }} >
              Modifier profil
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: `${api.url_photo}User/${user.photo}`}}
        />
      </View>
      <Text style={styles.nameText}>
        {user.username}
      </Text>
      </View>
      </ScrollView>
      <View
        style={{
          marginTop: scale(-130),
          borderBottomWidth: 1,
          borderBottomColor: Colors.yellow,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: scale(40),
          padding:scale(5),
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            color: Colors.tabColor,
            fontWeight: 'bold',
            fontSize: scale(15)
          }}>
            25
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name='people-outline' size={20} color={Colors.grey1} />
            <Text style={{
              fontSize: scale(11),
              marginLeft: scale(5),
              color: Colors.grey1
            }}>
              Friends
                </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            color: Colors.tabColor,
            fontWeight: 'bold',
            fontSize: scale(15)
          }}>
            100
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name='heart-outline' size={20} color={Colors.grey1} />
            <Text style={{
              fontSize: scale(11),
              marginLeft: scale(5),
              color: Colors.grey1
            }}>
              Favourites
                </Text>
          </View>
        </View>
      </View>
      <Row>

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
                Favourites
              </Text>
            </TabHeading>}>
            <FavouriteComponent />
          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: 'white' }}>
              <Ionicons name="people-outline" color={tab2Color} size={20} />
              <Text style={{
                color: tab2Color,
                fontSize: scale(12)
              }}>
                Friends
              </Text>
            </TabHeading>} >
            <FriendsComponent />
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
    height: scale(104),
    width: scale(100),
    alignSelf: 'center',
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    margin: 8,
    elevation: 10,
  },
  image: {
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    height: scale(100),
    width: scale(100),
    borderColor: "white",
    borderWidth: 0.8,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: scale(20),
    fontFamily: 'MafraDisplay-Book',
    color: Colors.grey2,
  }
})