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
 } from 'react-native';
 import {QueryClient, QueryClientProvider} from 'react-query';
 import theme from './src/constants/theme';
 import AppNavigator from './src/navigation/AppNavigator';;
 import Styles from './src/constants/Styles';

//  console.disableYellowBox = true;


 export const queryClient = new QueryClient();
 const App = () => {
 
   return (
  
     
       <QueryClientProvider client={queryClient}>
         <SafeAreaView style={{flex: 1}}>
           <FlashMessage
             position="top"
             duration={3000}
             style={styles.flash}
             textStyle={styles.textStyle}
             hideStatusBar={false}
           />
           
           <AppNavigator />
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
 