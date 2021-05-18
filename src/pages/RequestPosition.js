import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from '../components/Input';
import { Images } from '../constants/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { api } from '../constants/api_config';
import { useAppContext } from '../context/AppContext';


export default function RequestPosition(props) {

  const [ countryCode, setCountryCode ] = useState('216')    
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [ foundUser, setFoundUser ] = useState({
    name:'Name',
    phone:'Phonenumber',
    IDdevice:'',
    photo:'',
  })
  const [ searchLoading, setSearchLoading ] = useState(false)
  const [ addLoading, setAddLoading ] = useState(false)
  const { token, currentUser } = useAppContext()
  const [ result, setResult ] = useState('')


    const search = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"phonenumber":countryCode+phoneNumber});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${api.url}friends/recherchfriend`, requestOptions)
  .then(response => response.json())
  .then(result => {
    setSearchLoading(false)
    console.log(result)
    if (result.data!= undefined) {
      setResult('yes')
      setFoundUser({
        name: result.data.name,
        phone: result.data.phonenumber,
        IDdevice: result.data.IDdevice,
        photo: result.data.photo,
      })
    } else {
      setResult('no')
    }
  })
  .catch(error => console.log('error', error));
    }

    const position = () => {
      setAddLoading(true)
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "phonenumber": foundUser.phone,
  "app_id": api.ONE_SIGNAL_ID ,
  "contents":{"en":`${currentUser.username} vous a envoyé une demande pour lui partager ton localisation.`},
  "headings":{"en":"Demande localisation"}});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${api.url}friends/sendNotification`, requestOptions)
  .then(response => response.json())
  .then(result => {
    setAddLoading(false)
    console.log(result)
  })
  .catch(error => {
    setAddLoading(false)
    console.log('error', error)
});
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
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
                    onPress={()=>props.navigation.navigate('AddFriend')}
                    style={{ 
                      paddingVertical: scale(3) ,
                        position:'absolute',
                        right:scale(0),
                        borderWidth:1,
                        borderRightWidth:0,
                        borderColor: Colors.logoGreen,
                        borderTopLeftRadius: scale(15),
                        paddingHorizontal: scale(15),
                        backgroundColor: Colors.logoGreen,
                        borderBottomLeftRadius: scale(15),
                        elevation:5
                     }}>
                     <MaterialCommunityIcons name='account-multiple-plus' color={Colors.white} size={scale(24)} />
                </TouchableOpacity>
        <Text style={{
          fontFamily: "EpoqueSeria-BoldItalic",
          fontSize: scale(25),
          color: Colors.backgroundColor1
        }}>
          Request Position
              </Text>
      </View>
      <View style={{flexDirection:'row', paddingHorizontal:scale(10),justifyContent:'space-between'}}>
          <Input
        keyboardType='numeric'
        placeholder='phone number'
        name='phone'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginTop:scale(20) }}
        errorMessage={phoneErrorMessage}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        textColor = {Colors.tabColor}
        containerColor = {Colors.tabColor}
        styleText={{color: Colors.tabColor}}
      />
        <TouchableOpacity
                      onPress={()=>{search()}}
                      disabled={searchLoading}
                      style={{
                        backgroundColor: Colors.logoBlue,
                        width: scale(80),
                        height:scale(35),
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:3,
                        borderRadius: scale(5),
                        marginTop:scale(20) ,
                    }}>
                      { searchLoading ? <ActivityIndicator size="large" color="white" /> : 
                      <AntDesign name='search1' size={25} color={Colors.white} />
                  }
                    </TouchableOpacity>
          </View>

          { result=='yes' && <View
            style={{
              width:scale(280),
              height:scale(70),
              alignSelf: 'center',
              borderRadius:scale(20),
              elevation:2,
              flexDirection:'row'
            }}
          >
            <View style={styles.imageContainer}>
        <Image
          style={styles.image}
           source={ foundUser.photo != 'default.jpg' ? {uri: `${api.url_photo}User/${foundUser.photo}`}: Images.emptyprofil}
          // source={Images.emptyprofil}
        />
      </View>
      <View style={{
                height: scale(40),
                alignSelf: 'center',
                borderLeftWidth: 0.5,
            }}></View>
            <View style={{flex:0.5 ,flexDirection:'column', justifyContent:'center', paddingLeft:scale(20)}}>
              <Text style={{fontWeight:'bold'}}>{foundUser.name}</Text>
              <Text>+{foundUser.phone}</Text>
            </View>
            <View style={{
                height: scale(40),
                alignSelf: 'center',
                borderLeftWidth: 0.5,
            }}></View>
            <View style={{flex:0.3, alignItems:'center', justifyContent:'center'}}>
              
              { currentUser.phone != foundUser.phone && <TouchableOpacity
                      onPress={()=>{position()}}
                      disabled={addLoading}
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
                      { addLoading ? <ActivityIndicator size="large" color="white" /> : 
                       <FontAwesome
                       name='location-arrow'
                       size={scale(20)}
                       color={Colors.white}/>
                  }
                    </TouchableOpacity>}
            </View>
          </View>}
          {result=='no' && <View style={{alignSelf:'center',flexDirection:'column', alignItems:'center',marginTop:scale(20)}}>
          <MaterialCommunityIcons name='cancel' color={Colors.red} size={scale(50)} />
          <Text>No friend found with the number entered</Text>
          </View>}

        </View>
    )
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imageContainer: {
    flex:0.2,
    height: scale(50),
    width: scale(50),
    alignSelf: 'center',
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    alignItems: 'center',
    margin: 8,
  },
  image: {
    borderRadius: (Dimensions.get('window').height * 0.3) / 2,
    height: scale(50),
    width: scale(50),
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