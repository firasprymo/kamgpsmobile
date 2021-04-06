import { Col, Row, Tab, TabHeading, Tabs, Text } from 'native-base';
import React , { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FavouriteComponent from '../components/FavouriteComponent';
import FriendsComponent from '../components/FriendsComponent';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';




export default function Favourite(props) {
  const [currentTab, setCurrentTab] = useState(true)
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



  return (
    <View style={styles.container}>
        <TouchableOpacity style={{ padding: scale(5) }}>
          <AntDesign name='arrowleft' size={30} color='grey' />
        </TouchableOpacity>

      <View style={{ flexDirection: 'row', width: width, alignItems:'center' }}>
        <TouchableOpacity style={{ paddingHorizontal: scale(10) }}>
          <Ionicons name='card' size={40} color={Colors.tabColor} />
        </TouchableOpacity>
        <View style={{ position: 'absolute', right: scale(0), paddingHorizontal: scale(5) }}>
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: scale(10) }}>
            <SimpleLineIcons name='pencil' size={25} color={Colors.tabColor} />
            <Text style={{ color: Colors.tabColor, fontSize: scale(10), fontWeight: 'bold', marginTop: scale(2) }} >
              Modifier profil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={Images.user3}
        />
      </View>
      <Text style={styles.nameText}>
        Olivia Watson
      </Text>
      <Row size={0.15} style={{marginTop: scale(20), borderBottomWidth: 1, borderBottomColor: Colors.yellow}}>
        <Col style={{alignItems: 'center'}}>
          <Text style={{ color: Colors.tabColor, fontWeight: 'bold', fontSize: scale(15)}}>
            25
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name='people-outline' size={20} color= {Colors.grey1}  />
            <Text style={{ fontSize: scale(11),marginLeft: scale(5), color: Colors.grey1}}>Friends</Text>
          </View>
          </Col>
        <Col style={{alignItems: 'center'}}>
        <Text style={{ color: Colors.tabColor, fontWeight: 'bold', fontSize: scale(15)}}>
            100
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name='heart-outline' size={20} color= {Colors.grey1}  />
            <Text style={{ fontSize: scale(11), marginLeft: scale(5), color: Colors.grey1}}>Favourites</Text>
          </View>
          </Col>
      </Row>
      <Row>

       <Tabs onChangeTab={()=>{
         setCurrentTab(!currentTab)
       }}
          tabBarUnderlineStyle={{
          backgroundColor: Colors.tabColor,
          width: scale(130),
          marginHorizontal: scale(25),
          borderRadius: scale(100) }} >
       <Tab  
       heading={<TabHeading style={{backgroundColor: 'white'}}>
         <Ionicons name="heart-outline" color={tab1Color} size={20} />
         <Text style={{color: tab1Color, fontSize: scale(12)}} >Favourites</Text>
         </TabHeading>} >
            <FavouriteComponent />
         </Tab>
         <Tab  
       heading={<TabHeading  style={{backgroundColor: 'white'}}>
         <Ionicons name="people-outline" color={ tab2Color } size={20} />
         <Text style={{color: tab2Color, fontSize: scale(12)}}>Friends</Text>
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