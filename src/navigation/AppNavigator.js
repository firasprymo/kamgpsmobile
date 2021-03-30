import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Transition} from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Colors} from '../constants/Colors';
import WelcomPage from '../pages/WelcomPage';
import {StatusBar} from 'react-native';
import IntroductionPage from '../pages/IntroductionPage';
import LoginPage from '../pages/LoginPage';
// import {
//   AnimationType,
//   getAnimatingBottomBar,
// } from 'react-native-animating-bottom-tab-bar';
const navOptionsHandler = navigation => ({
  headerShown: false,
});
StatusBar.setBackgroundColor(Colors.welcomeColor1);
StatusBar.setBarStyle(Colors.light);

const welcomStack = createStackNavigator({
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
    Welcome: welcomStack,
    Auth: authStack,
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
