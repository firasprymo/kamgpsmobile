import React from 'react';
import {Image, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import Box from '../components/Box';
import Styles from '../constants/Styles';

export default function WelcomPage(props) {
  React.useEffect(() => {
    setTimeout(() => props.navigation.navigate('Introduction'), 2000);
  }, []);
  return (
    <Box
      flex={1}
      backgroundColor="backgroundSplashBlue"
      style={{...Styles.Common.ColumnCenter}}>
      {/* <Image
        source={Images.backgroundSplash}
        style={{width: scale(80), height: scale(110)}}
      /> */}
    </Box>
  );
}
