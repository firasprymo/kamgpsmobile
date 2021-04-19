import React from 'react';
import {Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../constants/Colors';
import {scale} from 'react-native-size-matters';
import  Icon  from 'react-native-vector-icons/FontAwesome';

const ProfilImageUpload = props => {
  const source = props?.source ? {uri: props?.source?.uri} : props?.default;
  return (
    <View style={{...styles.container, ...props.style}}>
      <Image
        style={{
          borderRadius: (Dimensions.get('window').height * 0.3) / 2,
          height: scale(95),
          width: scale(95),
        }}
        source={props.source}
      />
      <TouchableOpacity onPress={props.onPress} style={styles.uploadIcon}>
        <Icon style={styles.icon} name='arrow-circle-up' size={25} color={Colors.welcomeColor1} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').height * 0.15,
    borderRadius: (Dimensions.get('window').height * 0.15) / 2,
    backgroundColor: 'rgba(189, 184, 224,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3
  },
  uploadIcon: {
    position: 'absolute',
    bottom: Platform.select({
      ios: 12,
      android: 0,
    }),
    right: Platform.select({
      ios: 6,
      android: 0,
    }),
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  icon: {
    color: Colors.welcomeColor3,
  },
});

export default ProfilImageUpload;
