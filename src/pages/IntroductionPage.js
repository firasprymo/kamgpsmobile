import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';
import * as Animatable from 'react-native-animatable';
import Text from '../components/Text';

export default function IntroductionPage(props) {
 
  return (
    <Box flex={1} backgroundColor="backgroundSplashBlue" style={styles.header}>
      {/* <Animatable.Image
        animation="bounceIn"
        duration={500}
        source={Images.backgroundSplash}
        style={styles.logo}
        resizeMode="stretch"
      /> */}
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Box
          paddingHorizontal="l"
          style={{...Styles.Common.ColumnCenter}}
          marginTop="l">
          <Text>hi there</Text>
        </Box>
      </Animatable.View>
    </Box>
  );
}
const {height, width} = Dimensions.get('screen');
const height_logo = height * 0.22;
const width_logo = width * 0.3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    marginHorizontal: scale(20),
    marginTop: scale(20),
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    elevation: scale(5),
    width: scale(300),
    height: scale(10)
    // paddingVertical: 50,
    // paddingHorizontal: 30,
  },
  logo: {
    width: width_logo,
    height: height_logo,
    marginTop: scale(100),
    marginBottom: scale(100),
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  // singnInbutton: {
  //   width: scale(300),
  //   backgroundColor: Colors.backgroundSplashBlue,
  //   alignItems: 'center',
  //   padding: Dimensions.get('window').height * 0.02,
  //   borderRadius: 15,
  // },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
