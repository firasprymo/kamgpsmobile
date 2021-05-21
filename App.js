/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import {backgroundColor, ThemeProvider} from '@shopify/restyle';
 import React from 'react';
 import FlashMessage from 'react-native-flash-message';
 import {
   StatusBar,
   StyleSheet,
   SafeAreaView,
   LogBox,
 } from 'react-native';
 import {QueryClient, QueryClientProvider} from 'react-query';
 import theme from './src/constants/theme';
 import AppNavigator from './src/navigation/AppNavigator';;
 import Styles from './src/constants/Styles';
 import {AppContextProvider, useAppContext} from './src/context/AppContext';
import { api } from './src/constants/api_config';
import OneSignal from 'react-native-onesignal';

//   console.disableYellowBox = true;
 //     LogBox.ignoreAllLogs()

 export const queryClient = new QueryClient();
 function onIds(device){
   console.log(device?.userId)
 }
 const App = () => {
  React.useEffect(() => {
  
    OneSignal.init(api.ONE_SIGNAL_ID);
    OneSignal.addEventListener('ids', onIds);

    //  OneSignal.enableSound(true);

    // AsyncStorage.getItem('id').then(val => {
    //   if (val) {
    //     console.log({id: val});
    //     //OneSignal.sendTag('id', val);
    //     // AsyncStorage.getItem('token').then(tk => {
    //     //   if (tk) {
    //     //     AsyncStorage.setItem('token', tk).then(tok => {});
    //     //   }
    //     // });
    //   }
    // });
  }, []);
   return (
  
     
       <QueryClientProvider client={queryClient}>
         <SafeAreaView style={{flex: 1}}>
         <AppContextProvider>
           <FlashMessage
             position="top"
             duration={3000}
             style={styles.flash}
             textStyle={styles.textStyle}
             hideStatusBar={false}
           />
           
           <AppNavigator />
           </AppContextProvider>
         </SafeAreaView>
       </QueryClientProvider>

     
   );
 };
 
 const styles = StyleSheet.create({
   flash: {
     marginTop: Styles.paddings.medium,
   },
   textStyle: {
     fontFamily: Styles.FontFamily,
     fontSize: Styles.FontSize.medium,
   },
 });
 
 export default App;
 