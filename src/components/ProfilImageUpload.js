import React from 'react';
import {Dimensions, Image, Platform, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/Colors';
import {scale} from 'react-native-size-matters';
import IconButton from './IconButton';

const ProfilImageUpload = props => {
  const source = props?.source ? {uri: props?.source?.uri} : props?.default;
  return (
    <View style={{...styles.container, ...props.style}}>
      <Image
        style={{
          borderRadius: (Dimensions.get('window').height * 0.3) / 2,
          height: scale(100),
          width: scale(100),
        }}
        source={source}
      />
      <View style={styles.uploadIcon}>
        <IconButton style={styles.icon} name="md-arrow-up" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').height * 0.15,
    borderRadius: (Dimensions.get('window').height * 0.15) / 2,
    backgroundColor: 'grey',
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 2,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.light,
    backgroundColor: Colors.primary,
  },
  icon: {
    color: Colors.light,
    fontSize: 16,
  },
});

export default ProfilImageUpload;
