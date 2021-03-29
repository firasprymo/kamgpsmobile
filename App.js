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
 import {Colors} from './src/constants/Colors';
 import theme from './src/constants/theme';
 import AppNavigator from './src/navigation/AppNavigator';;
 import Styles from './src/constants/Styles';
 import WelcomPage from './src/pages/WelcomPage'
 
 export const queryClient = new QueryClient();
 const App = () => {
   StatusBar.setBackgroundColor(Colors.statusBarColor);
   StatusBar.setBarStyle(Colors.light);
 
   return (
     <ThemeProvider theme={theme}>
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
     </ThemeProvider>
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
 