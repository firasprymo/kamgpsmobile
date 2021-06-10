import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
//import RNSimData from 'react-native-sim-data';
const AppContext = React.createContext();

const AppContextProvider = props => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userId, setUserId] = React.useState(props?.userId);
  const [token, _setToken ] = React.useState('');
  const [ markedPlace, setMarkedPlace] = React.useState({
    lat: '',
    lng: '',
  })
  const [ selectedPlace, setSelectedPlace] = React.useState({
    latitude: '',
    longitude: '',
  })

  useEffect(()=>{
    AsyncStorage.getItem('token').then(token=>{
      if (token) {
        _setToken(token)
      }
    }).catch(err => console.log(err))
  },[])

  const setToken = (val) => {
    AsyncStorage.setItem('token',val);
    _setToken(val);
  }

  // const [countryCodeSim, setCountryCodeSim] = React.useState('');
  React.useEffect(() => {
    setUserId(props?.userId);
  }, [currentUser]);
  // React.useEffect(() => {
  //   console.log(RNSimData.getCountryCode());
  //   setCountryCodeSim(RNSimData.getSimInfo().toUpperCase());
  // }, [countryCodeSim]);
  return (
    <AppContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        userId,
        token,
        setToken,
        markedPlace,
        setMarkedPlace,
        selectedPlace,
        setSelectedPlace
        //countryCodeSim,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
const useAppContext = () => React.useContext(AppContext);
export {AppContextProvider, useAppContext};

