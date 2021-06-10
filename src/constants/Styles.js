/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import {Dimensions, Platform} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import Config from './Config';
import Device from './Device';

const {height, width} = Dimensions.get('window');

const Styles = {
  width: Dimensions.get('window').width,
  height: Platform.OS !== 'ios' ? height : height - scale(20),
  navBarHeight: Platform !== 'ios' ? height - width : 0,
  headerHeight: Platform.OS === 'ios' ? scale(40) : scale(56),

  thumbnailRatio: 1.2, // Thumbnail ratio, the product display height = width * thumbnail ratio

  app: {
    flexGrow: 1,
    backgroundColor: Device.isIphoneX ? '#FFF' : '#000',
    paddingTop: Device.ToolbarHeight,
  },
  margins: {
    small: scale(5),
    medium: scale(10),
    big: scale(15),
    large: scale(20),
    xLarge: scale(30),
  },
  paddings: {
    small: scale(5),
    medium: scale(10),
    big: scale(15),
    large: scale(20),
    xLarge: scale(30),
  },
  FontSize: {
    xTiny: scale(10),
    tiny: scale(12),
    small: scale(14),
    medium: scale(16),
    big: scale(18),
    large: scale(20),
  },
  fontFamily: 'OpenSans-SemiBold',
  IconSize: {
    TextInput: scale(25),
    ToolBar: scale(18),
    Inline: scale(20),
    SmallRating: scale(14),
  },
  fontWeight: {
    fontWeight: 'bold',
  },
  FontFamily: 'OpenSans-SemiBold',
  Common: {
    Column: {
      flexDirection: 'column',
    },
    ColumnCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    ColumnCenterTop: {
      alignItems: 'center',
    },
    ColumnCenterBottom: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    ColumnCenterLeft: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    ColumnCenterRight: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    Row: {
      flexDirection: 'row',
    },
    RowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    RowCenterTop: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    RowCenterBottom: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    RowCenterLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    RowCenterRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    RowCenterBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    RowCenterAround: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    RowCenterEvenly: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    // More traits

    IconSearchView: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      marginBottom: 10,
      borderRadius: 50,

      shadowOffset: {width: 0, height: -4},
      shadowColor: 'rgba(0,0,0, .3)',
      elevation: 10,
      shadowOpacity: 0.1,
      zIndex: 9999,
    },
    IconSearch: {
      width: 20,
      height: 20,
      margin: 12,
      zIndex: 9999,
    },

    logo: {
      width: Platform.OS === 'ios' ? 180 : 200,
      height: Platform.OS === 'ios' ? 30 : 30,
      resizeMode: 'contain',
      ...Platform.select({
        ios: {
          marginTop: Device.isIphoneX ? -40 : Config.showStatusBar ? -4 : -15,
        },
        android: {
          marginTop: 2,
          marginLeft: 30,
        },
      }),
    },

    toolbar: (backgroundColor, isDark) => ({
      backgroundColor: '#fff',
      zIndex: 1,
      // paddingLeft: 15,
      // paddingRight: 15,
      paddingTop: 4,
      borderBottomWidth: isDark ? 0 : 1,
      borderBottomColor: 'transparent',

      ...Platform.select({
        ios: {
          height: Config.showStatusBar
            ? Device.isIphoneX
              ? 5
              : 40
            : Device.isIphoneX
            ? 5
            : 25,
        },
        android: {
          height: 46,
          paddingTop: 0,
          marginTop: 0,
          elevation: 0,
        },
      }),
    }),

    headerStyle: {
      fontSize: 16,
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
      height: 40,
      backgroundColor: 'transparent',

      ...Platform.select({
        ios: {
          marginBottom: !Config.showStatusBar ? 14 : 0,
          marginTop: Device.isIphoneX ? -10 : 12,
        },
        android: {
          marginBottom: 4,
          elevation: 0,
        },
      }),
    },
    headerTitleStyle: {
      color: '',
      fontSize: 16,
      height: 40,
      textAlign: 'center',

      alignSelf: 'center',
      ...Platform.select({
        ios: {
          marginBottom: !Config.showStatusBar ? 14 : 0,
          marginTop: Device.isIphoneX ? -10 : 12,
        },
        android: {
          marginTop: 25,
        },
      }),
    },
    headerStyleWishList: {
      fontSize: 16,
      textAlign: 'center',
      alignSelf: 'center',

      marginBottom: !Config.showStatusBar
        ? Device.isIphoneX
          ? 40
          : 15
        : Device.isIphoneX
        ? 25
        : 5,
    },
    toolbarIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',

      // marginRight: 18,
      // marginBottom: 12,
      marginLeft: 18,
      opacity: 0.8,
      ...Platform.select({
        ios: {
          top: !Config.showStatusBar
            ? Device.isIphoneX
              ? -20
              : -8
            : Device.isIphoneX
            ? -15
            : 0,
        },
        android: {
          top: 0,
        },
      }),
    },

    toolbarFloat: {
      position: 'absolute',
      top: 0,
      borderBottomWidth: 0,
      zIndex: 999,
      width,

      ...Platform.select({
        ios: {
          backgroundColor: 'transparent',
          marginTop: Config.showStatusBar
            ? Device.isIphoneX
              ? -20
              : -3
            : Device.isIphoneX
            ? -15
            : -3,
        },
        android: {
          backgroundColor: 'transparent',
          height: 46,
          paddingTop: Config.showStatusBar ? 24 : 0,
        },
      }),
    },
    viewCover: {
      backgroundColor: '#FFF',
      zIndex: 99999,
      bottom: 0,
      left: 0,
      width,
      height: 20,
      // position: "absolute",
    },
    viewCoverWithoutTabbar: {
      backgroundColor: '#FFF',
      zIndex: 99999,
      bottom: 0,
      left: 0,
      width,
      height: 35,
      position: 'absolute',
    },

    viewBack: {
      ...Platform.select({
        ios: {
          marginTop: Device.isIphoneX ? -25 : -5,
        },
      }),
    },
    toolbarIconBack: {
      width: 16,
      height: 16,
      resizeMode: 'contain',

      marginRight: 18,
      marginBottom: 12,
      marginLeft: 18,
      opacity: 0.8,
      ...Platform.select({
        ios: {
          top: !Config.showStatusBar ? 4 : Device.isIphoneX ? 4 : 8,
        },
        android: {
          top: 0,
        },
      }),
    },
  },
  errorText: {
    color: 'red',
  },
  icon: {
    height: scale(30),
    width: scale(30),
  },
};

export default Styles;
