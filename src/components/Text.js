import React from 'react';
import {Text as MyText} from 'react-native';
import Styles from '../constants/Styles';
import {createText} from '@shopify/restyle';
const ShopiFyText = createText();
const Text = props => {
  return (
    <ShopiFyText style={[styles.myText, props.style]} {...props}>
      {props.children}
    </ShopiFyText>
  );
};

const styles = {
  myText: {
    fontFamily: Styles.FontFamily,
  },
};
export default Text;
