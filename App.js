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

  //console.disableYellowBox = true;
// LogBox.ignoreAllLogs()

 export const queryClient = new QueryClient();
 const App = () => {
 
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
 