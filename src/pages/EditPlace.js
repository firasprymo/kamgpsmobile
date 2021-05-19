import React, { useEffect, useState } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import { useAppContext } from '../context/AppContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { api } from '../constants/api_config';
import Geocoder from 'react-native-geocoding';

const emptyphotouri = Image.resolveAssetSource(Images.emptyphoto).uri
const apiKey = 'AIzaSyDfxAFFp8jEZrtWFxr8FTieAsUAlQhFhAs'
Geocoder.init(apiKey);

export default function AddPlace(props) {
    
    const { selectedPlace} = useAppContext()
    const {token} = useAppContext()
    const _id = props.navigation.getParam('id')
    const _name = props.navigation.getParam('name') ? props.navigation.getParam('name') : ''
    const _address = props.navigation.getParam('address') ? props.navigation.getParam('address') : ''
    const image = props.navigation.getParam('photo') ? props.navigation.getParam('photo') : {uri : emptyphotouri}
    const _category = props.navigation.getParam('category') ? props.navigation.getParam('category') : ''

    const latitude = selectedPlace.latitude != '' ? selectedPlace.latitude : props.navigation.getParam('latitude');
    const longitude = selectedPlace.longitude != '' ? selectedPlace.longitude : props.navigation.getParam('longitude');
    const [address, setAddress ] = useState(_address);
    const [photoChanged, setPhotoChanged] = useState(false)
    const [ name, setName ] = useState(_name)
    const [category, setCategory] = useState(_category);
    const [file, setFile] = useState({
        fileName: '',
        uri: image.uri,
        type: '',
      })
   
      

      const handleOk = () => {
            if (category!='' && name.length > 1 && address!='') {
                var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("name", name);
formdata.append("addresse", address);
formdata.append("categorie", category);
formdata.append("location.lat", latitude);
formdata.append("location.lng", longitude);
console.log("photochanged",photoChanged)
if (photoChanged) {
    console.log('this is the uri : ', file.uri)
    formdata.append("photo", {
      name: file.fileName,
      type: file.type,
      uri:
        Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
    });
  } else {
    formdata.append("photo", { uri: image.uri, type: "image/png", name: name+".png" });
  }

  console.log("formdata",formdata)

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${api.url}favorites/${_id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log( "edit consol = ",result)
      alert('Saved !')
    })
  .catch(error => console.log('error', error));
            }
            else alert("la catégorie ou le nom ou le lieu n'est pas rempli")
      }

    const launchImageLibraryFunction = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            fileData: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            setFile(response);
            setPhotoChanged(true)
          }
        });
    
      }
      useEffect(()=>{

        if (latitude!=''){
        Geocoder.from(latitude, longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[1].long_name;
			setAddress(addressComponent);
		})
		.catch(error => console.warn(error));
    }
      },[latitude])

    return (
        <View style={styles.container} >

<View style={styles.headBar} >
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ padding: scale(5) }}>
                    <Feather name='x' size={30} color={Colors.grey2} />
                </TouchableOpacity>
                <View style={{
                    flex: 0.9,
                    height: scale(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                
                }} >
                    <Text style={{ fontFamily: 'EpoqueSeria-BoldItalic',color: Colors.grey2, fontWeight: '300', fontSize: scale(20) }}>Ajouter un lieu</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{ handleOk() }}
                    style={{ padding: scale(5) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: scale(18), color: Colors.grey2 }}>OK</Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginTop:scale(50),alignSelf:'flex-start',marginLeft:scale(50),fontFamily: 'EpoqueSeria-BoldItalic',fontSize:scale(16)}}>Nom:</Text>
            <View style={{
                width: scale(260),
                height: scale(40),
                borderWidth: 1,
                borderColor: Colors.grey4,
                borderRadius: scale(5),
                marginTop: scale(10),
                paddingLeft: scale(10)
            }}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder='Nom'
                    style={{ flex: 1, fontSize: scale(16) }} />
            </View>
            <Text style={{margin:scale(10),alignSelf:'flex-start',marginLeft:scale(50),fontFamily: 'EpoqueSeria-BoldItalic', fontSize:scale(16)}}>Catégorie:</Text>
            <View 
                style={{
                    flexDirection:'row'
                }}>
                    <TouchableOpacity
                        onPress={()=>{setCategory('Restaurant')}}
                        style={{
                            backgroundColor: category=='Restaurant' ? Colors.green2 : 'white',
                            width: scale(70),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: category=='Restaurant' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Restaurant
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{setCategory('Boutique')}}
                        style={{
                            backgroundColor: category=='Boutique' ? Colors.green2 : 'white',
                            width: scale(70),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: category=='Boutique' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Boutique
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{setCategory('Service')}}
                        style={{
                            backgroundColor: category=='Service' ? Colors.green2 : 'white',
                            width: scale(70),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: category=='Service' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Service
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{setCategory('Other')}}
                        style={{
                            backgroundColor: category=='Other' ? Colors.green2 : 'white',
                            width: scale(70),
                            height:scale(30),
                            justifyContent:'center',
                            alignItems:'center',
                            elevation:3
                        }}>
                            <Text style={{
                                        color: category=='Other' ? 'white' : 'grey',
                                        fontWeight:'bold'
                                    }}>
                                Other
                            </Text>
                    </TouchableOpacity>
            </View>
            <View style={{
                flexDirection:'column',
                marginVertical: scale(20),
            }}>
                <Image 
                    resizeMode='contain'
                    source={{uri: file.uri}}
                    style={{
                        width: scale(200),
                        height: scale(150),
                    }} />
                    <TouchableOpacity
                        onPress={()=>launchImageLibraryFunction()}
                        style={{
                            alignSelf:'center',
                            flexDirection: 'row',
                            justifyContent:'center',
                            alignItems:'center',
                            width: scale(50),
                            height: scale(50),
                            borderRadius: scale(50),
                            borderWidth:0,
                            marginTop: scale(-20),
                            backgroundColor:Colors.grey3,
                            elevation:5
                        }}
                    >
                        
                    <MaterialIcons
                    name='add-photo-alternate'
                    size={scale(30)}
                    color={Colors.grey2}
                 />
                    </TouchableOpacity>
            </View>
            <Text style={{
                        color: Colors.grey1,
                        fontSize: scale(14),
                        width: scale(270),
                        alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>
                        Address: {" "}
                        <Text
                            style={{
                                fontSize: scale(12),
                                fontWeight: 'normal',
                                color: Colors.grey1
                            }}>
                            {address}
                        </Text>
                    </Text>
        

            <ImageBackground source={Images.mapCard} style={{ width: width, height: scale(100), marginTop: scale(10) }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('SelectPlace')}
                        style={{
                            width: scale(250),
                            height: scale(50),
                            borderWidth: 1,
                            borderRadius: scale(5),
                            borderColor: Colors.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: scale(14) }}>Lieu sur la carte</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </View>
    );
}

const { width, heigth } = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    headBar: {
        width: width,
        height: scale(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(10)
    },
    image: {
        borderRadius: (Dimensions.get('window').height * 0.3) / 2,
        height: scale(40),
        width: scale(40),
        borderColor: "white",
        borderWidth: 0.8,
    },
})