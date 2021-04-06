import React from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions, View, Text, StatusBar } from 'react-native';
import { scale } from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';
import * as Animatable from 'react-native-animatable';
import { Images } from '../constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants/Colors';
import TextButton from '../components/TextButton';
import Swiper from 'react-native-swiper'
import Logo from '../components/Logo';

export default function IntroductionPage(props) {

  return (
    <Box flex={1}>
      <StatusBar hidden />
      <ImageBackground source={Images.introductionBackground} style={styles.background}>
        <Logo style={{ marginTop: scale(20) }} />
        <Swiper
          loop={false}
          autoplay
          autoplayTimeout={4}
          activeDotColor='white'
          activeDotStyle={{
            color: 'white',
            width: scale(20)
          }}
          dotColor='#1b719c'>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: width }}>
              <Image resizeMode='stretch' source={Images.map1} style={styles.map} />
            </View>
            <View
              style={{
                alignItems: 'center',
                width: width * 0.7,
                marginTop: scale(10)
              }}>
              <Text
                style={{
                  fontSize: scale(25),
                  color: Colors.white
                }}>
                Events
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: scale(15),
                  color: Colors.white
                }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: width }}>
              <Image resizeMode='stretch' source={Images.map2} style={styles.map} />
            </View>
            <View
              style={{
                alignItems: 'center',
                width: width * 0.7,
                marginTop: scale(10)
              }}>
              <Text
                style={{
                  fontSize: scale(25),
                  color: Colors.white
                }}>
                Events
                  </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: scale(15),
                  color: Colors.white
                }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                </Text>
            </View>
          </View>
        </Swiper>

        <TextButton onPress={() => { props.navigation.navigate('Auth') }}
          style={styles.skip}
          fontSize={scale(14)}
          color={Colors.white}
          title='Skip >'
        />
      </ImageBackground>
    </Box>
  );
}
const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    paddingTop: scale(20)
  },
  map: {
    width: width,
    height: height * 0.40,
  },
  skip: {
    marginBottom: scale(10),
    marginTop: scale(60),
    color: Colors.white,



  }

});
