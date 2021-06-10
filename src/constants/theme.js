import {createTheme} from '@shopify/restyle';
import {Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import Styles from './Styles';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',
  black: '#0B0B0B',
  white: '#fff',
  yellow: '#ab8b2b',
  grey1: '#afb0af',
  blueSky: '#EEF7FF',
  discountColor: '#1cc0a0',
  red: 'red',
  grey2: '#b6b6b6',
  primary: '#5663ff',
  transparent: 'rgba(0,0,0,0.5)',
  transparent1: 'rgba(0,0,0,0.1)',
  starColor: '#feb236',
  greyStart: '#f9f3f3',
  grey: 'grey',
  transparentRed: 'rgba(255,0,0,0.2);',
  blueSky: '#1B9EEA',
  backgroudPin: 'F1FBFF',
  backgroundSplashBlue: '#88fc03',
  backgroundMainColor: '#F1F8FF',
  grey2: '#7C7D7E',
};

const theme = createTheme({
  colors: {
    primary: palette.primary,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    black: palette.black,
    white: palette.white,
    yellow: palette.yellow,
    grey1: palette.grey1,
    blueSky: palette.blueSky,
    discountColor: palette.discountColor,
    red: palette.red,
    transparent: palette.transparent,
    transparent1: palette.transparent1,
    grey2: palette.grey2,
    startColor: palette.starColor,
    greyStart: palette.greyStart,
    grey: palette.grey,
    transparentRed: palette.transparentRed,
    blueSky: palette.blueSky,
    backgroudPin: palette.backgroudPin,
    backgroundSplashBlue: palette.backgroundSplashBlue,
    backgroundMainColor: palette.backgroundMainColor,
    grey2: palette.grey2,
  },
  spacing: {
    xs: scale(4),
    medium: scale(14),
    s: scale(10),
    m: scale(16),
    big: scale(70),
    l: scale(25),
    xl: scale(40),
    xls: scale(70),
    xxl: scale(100),
    xxxl: scale(140),
    xxxxl: scale(160),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontFamily: Styles.FontFamily,
      fontSize: scale(34),
      lineHeight: 42.5,
    },
    subheader: {
      fontFamily: Styles.FontFamily,

      fontSize: 28,
      lineHeight: 36,
    },
    body: {
      fontFamily: Styles.FontFamily,
      fontSize: 16,
      lineHeight: 24,
    },
    small: {
      fontFamily: Styles.FontFamily,
      fontSize: 10,
      lineHeight: 24,
    },
    tiny: {
      fontFamily: Styles.FontFamily,
      fontSize: 8,
      lineHeight: 24,
    },
    medium: {
      fontFamily: Styles.FontFamily,
      fontSize: 12,
      lineHeight: 24,
    },
    headerBold: {
      fontFamily: Styles.FontFamily,
      fontSize: scale(34),
      lineHeight: 42.5,
      fontWeight: 'bold',
    },
  },
});

export default theme;
