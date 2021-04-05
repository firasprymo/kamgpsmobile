import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Transition} from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Colors} from '../constants/Colors';
import WelcomPage from '../pages/WelcomPage';
import {Image, StatusBar} from 'react-native';
import IntroductionPage from '../pages/IntroductionPage';
import LoginPage from '../pages/LoginPage';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Maps from '../pages/Maps';
import Favourite from '../pages/Favourite';
import Notification from '../pages/Notification';
import Contribution from '../pages/Contribution';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Images } from '../constants/Images';
// import {
//   AnimationType,
//   getAnimatingBottomBar,
// } from 'react-native-animating-bottom-tab-bar';




const navOptionsHandler = navigation => ({
  headerShown: false,
});
StatusBar.setBackgroundColor(Colors.welcomeColor1);
StatusBar.setBarStyle(Colors.light);


const homeStack = createBottomTabNavigator({
  Maps: {
    screen: Maps,
    navigationOptions: navOptionsHandler,
  },
  Favourite: {
    screen: Favourite,
    navigationOptions: navOptionsHandler,
  },
  Notification: {
    screen: Notification,
    navigationOptions: navOptionsHandler,
  },
  Contribution: {
    screen: Contribution,
    navigationOptions: navOptionsHandler,
  },
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Maps') {
        return( focused
          ? <Image source={Images.mapTabIcon2} />
          : <Image source={Images.mapTabIcon1} />);
      } else if (routeName === 'Notification') {
        iconName = focused ? 'bell-ring-outline' : 'bell-ring-outline';
      } else if (routeName === 'Favourite') {
        iconName = focused ? 'heart-outline' : 'heart-outline';
      } else if (routeName === 'Contribution') {
        return(  focused ? 
          <IconAnt size={25} color={Colors.tabColor} name='addusergroup'/> :
        <IconAnt size={25} color={tintColor} name='addusergroup'/>);
      }

      // You can return any component that you like here!
      return <IconMaterial name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.tabColor,
    inactiveTintColor: 'gray',
    style: {
      backgroundColor:Colors.tabsBackground,
    }
  },
}
)
const welcomeStack = createStackNavigator({
  Welcome: {
    screen: WelcomPage,
    navigationOptions: navOptionsHandler,
  },
  Introduction: {
    screen: IntroductionPage,
    navigationOptions: navOptionsHandler,
  },
  
});
const authStack = createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: navOptionsHandler,
  },
  
});

const appNavigator = createAnimatedSwitchNavigator(
  {
    Welcome: welcomeStack,
    Auth: authStack,
    Home: homeStack,
  },
  {
    initialRouteName: 'Welcome',
    transition: (
      <Transition.Together>
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(appNavigator);
