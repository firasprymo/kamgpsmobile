import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, NavigationContext} from 'react-navigation';
import {Transition} from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Colors} from '../constants/Colors';
import WelcomPage from '../pages/WelcomPage';
import {Image, StatusBar} from 'react-native';
import IntroductionPage from '../pages/IntroductionPage';
import LoginPage from '../pages/LoginPage';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Maps from '../pages/Maps';
import Proximite from '../pages/Proximite';
import Contribution from '../pages/Contribution';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Images } from '../constants/Images';
import EditCard from '../pages/EditCard';
import AddPlace from '../pages/AddPlace';
import EditProfil from '../pages/EditProfil';
import Payment from '../pages/Payment';
import EditPlace from '../pages/EditPlace';
import SelectPlace from '../pages/SelectPlace';
import ResetPassword from '../pages/ResetPassword';
import { useAppContext } from '../context/AppContext';
import SavePlaceFromMap from '../pages/SavePlaceFromMap';
import Profil from '../pages/Profil';
import Position from '../pages/Position';
import Historique from '../pages/Historique';
import Notification from '../pages/Notification';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import VoirTout from '../pages/VoirTout';
import AddFriend from '../pages/AddFriend';
import RequestPosition from '../pages/RequestPosition';

// import {
//   AnimationType,
//   getAnimatingBottomBar,
// } from 'react-native-animating-bottom-tab-bar';



const navOptionsHandler = navigation => ({
  headerShown: false,
});
StatusBar.setBackgroundColor(Colors.white);
StatusBar.setBarStyle('dark-content');

const contributionStack = createStackNavigator({
  contribution: {
    screen: Contribution,
    navigationOptions: navOptionsHandler,
  },
  EditCard: {
    screen: EditCard ,
    navigationOptions: navOptionsHandler,
  },
  AddPlace: {
    screen: AddPlace ,
    navigationOptions: navOptionsHandler,
  },
  EditPlace: {
    screen: EditPlace ,
    navigationOptions: navOptionsHandler,
  },
  SelectPlace: {
    screen: SelectPlace ,
    navigationOptions: navOptionsHandler,
  },
})
const positionStack = createStackNavigator({
  RequestPosition: {
    screen: RequestPosition ,
    navigationOptions: navOptionsHandler,
  },
  AddFriend: {
    screen: AddFriend ,
    navigationOptions: navOptionsHandler,
  },
})
const profilStack = createStackNavigator({
  Profil: {
    screen: Profil,
    navigationOptions: navOptionsHandler,
  },
  EditProfil: {
    screen: EditProfil ,
    navigationOptions: navOptionsHandler,
  },
  Payment: {
    screen: Payment ,
    navigationOptions: navOptionsHandler,
  },
  EditPlace: {
    screen: EditPlace ,
    navigationOptions: navOptionsHandler,
  },
  SelectPlace: {
    screen: SelectPlace ,
    navigationOptions: navOptionsHandler,
  },
})
const mapStack = createStackNavigator({
  Maps: {
    screen: Maps,
    navigationOptions: navOptionsHandler,
  },
  Notification: {
    screen: Notification,
    navigationOptions: navOptionsHandler,
  },
  SavePlace: {
    screen: SavePlaceFromMap ,
    navigationOptions: navOptionsHandler,
  },
  SelectPlace: {
    screen: SelectPlace ,
    navigationOptions: navOptionsHandler,
  },
  
})
const proximiteStack = createStackNavigator({
  Proximite: {
    screen: Proximite,
    navigationOptions: navOptionsHandler,
  },
  VoirTout: {
    screen: VoirTout,
    navigationOptions: navOptionsHandler,
  },
})
contributionStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
profilStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
// mapStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible,
//   };
// };

const homeStack = createBottomTabNavigator({
  
  Maps: {
    screen: mapStack,
    navigationOptions: navOptionsHandler,
  },
  Position: {
    screen: positionStack,
    navigationOptions: navOptionsHandler,
  },
  Profil: {
    screen: profilStack,
    navigationOptions: navOptionsHandler,
  },
  Proximité: {
    screen: proximiteStack,
    navigationOptions: navOptionsHandler,
  },
  Contribution: {
    screen: contributionStack,
    navigationOptions: navOptionsHandler,
  },
  Historique: {
    screen: Historique,
    navigationOptions: navOptionsHandler,
  },
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      
      if (routeName === 'Maps') {
        return( focused
          ? <Image source={Images.mapTabIcon1} style={{tintColor:Colors.tabColor}}/>
          : <Image source={Images.mapTabIcon1} />);
      } else if (routeName === 'Proximité') {
        iconName = focused ? 'map-outline' : 'map-outline';
      } else if (routeName === 'Profil') {
        iconName = focused ? 'account-heart-outline' : 'account-heart-outline';
      } else if (routeName === 'Contribution') {
        return(  focused ? 
          <IconAnt size={25} color={Colors.tabColor} name='addusergroup'/> :
        <IconAnt size={25} color={tintColor} name='addusergroup'/>);
      }
      else if(routeName === 'Position') {
        return( focused
          ? <FontAwesome
          name='location-arrow'
          size={25}
          color={Colors.tabColor}/>
          : <FontAwesome
          name='location-arrow'
          size={25}
          color={tintColor} />);
      }
      else if(routeName === 'Historique') {
        return(
          focused ? 
          <SimpleLineIcons size={25} color={Colors.tabColor} name='list'/> :
        <SimpleLineIcons size={25} color={tintColor} name='list'/>
        )
      }

      // You can return any component that you like here!
      return <IconMaterial name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.tabColor,
    inactiveTintColor: 'gray',
    style: {
      backgroundColoredr:Colors.tabsBackground,
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
  ResetPassword: {
    screen: ResetPassword ,
    navigationOptions: navOptionsHandler,
  }
  
});

const appNavigator = createAnimatedSwitchNavigator(
  {
    Welcome: welcomeStack,
    Auth: authStack,
    Home: homeStack,
  },
  {
    initialRouteName: 'Home',
    transition: (
      <Transition.Together>
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(appNavigator);


