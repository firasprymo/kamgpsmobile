import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';
import * as Animatable from 'react-native-animatable';
import Text from '../components/Text';
import { Images } from '../constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants/Colors';
import TextButton from '../components/TextButton';
import Swiper from 'react-native-swiper'
import Logo from '../components/Logo';

export default function IntroductionPage(props) {

  return (
    <Box flex={1}>
      <LinearGradient colors={[Colors.backgroundColor1, Colors.welcomeColor2]} style={styles.background}>
        <Logo/>
        <Swiper  autoplay autoplayTimeout={4} activeDotColor='white' activeDotStyle={{color: 'white' ,width: scale(20) }}>
          <View style={{ alignItems: 'center' }}>
            <Image resizeMode='stretch' source={Images.map} style={styles.map} />
            <View style={{ alignItems: 'center', width: width * 0.6, marginTop:scale(10) }}>
              <Text style={{ fontSize: scale(25), color: Colors.white }}>Events</Text>
              <Text style={{ textAlign: 'center', fontSize: scale(15), color: Colors.white }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image resizeMode='stretch' source={Images.map} style={styles.map} />
            <View style={{ width: width * 0.6, alignItems:'center', marginTop:scale(10) }}>
              <Text style={{ fontSize: scale(25), color: Colors.white }}>Events</Text>
              <Text style={{textAlign: 'center',fontSize: scale(15), color: Colors.white }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </View>
        </Swiper>

        <TextButton onPress={()=>{props.navigation.navigate('Auth')}} style={{ marginBottom: scale(10) }} fontSize={scale(18)} title='Skip >' color={Colors.white} />


      </LinearGradient>
    </Box>
  );
}
const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center"
  },
  map: {
    width: width * 1.5,
    height: height * 0.35,
    // marginEnd: scale(95),
    marginTop: scale(20)
  },
  logo: {
    height: height * 0.12,
    width: width * 0.3,
    marginTop: scale(30),

  },
});
