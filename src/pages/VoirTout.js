import React,{ useState, useEffect } from 'react';
import {
  Image,
  Dimensions,
  View, Text, TouchableOpacity,
  ScrollView
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import { Colors } from '../constants/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getNearPlaces } from '../services/nearPlaces';
import { useAppContext } from '../context/AppContext';



export default function VoirTout(props) {

  const { token, setMarkedPlace } = useAppContext();

  const [hospitals, setHospitals] = useState([]);
  const [polices, setPolices] = useState([])
  const [pharmacies, setPharmacies] = useState([])
  const [restaurant, setRestaurant] = useState([])
    const type = props.navigation.getParam('type');
    const location = props.navigation.getParam('location');
    const data = type=='Urgence' ? hospitals : type=='Autre' ? restaurant : type=='Pharmacie' ? pharmacies :  polices
    useEffect(()=>{
      getNearPlaces(token, 'hospital', location).then(data => setHospitals(data)).catch(err => setHospitals(err))
        getNearPlaces(token, 'police', location).then(data => setPolices(data)).catch(err => setPolices(err))
        getNearPlaces(token, 'pharmacy', location).then(data => setPharmacies(data)).catch(err => setPharmacies(err))
        getNearPlaces(token, 'restaurant', location).then(data => setRestaurant(data)).catch(err => setRestaurant(err))
    
    },[])
    

    
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
                  onPress={() => {
                    setMarkedPlace({
                      lat: parseFloat(item.lat),
                      lng:  parseFloat(item.lng),
                      namee: item.address,
                    })
                    props.navigation.navigate('Maps')
                  }}
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
                <Text style={{ fontSize: scale(10), fontWeight: 'bold', width:scale(150) }}>
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
