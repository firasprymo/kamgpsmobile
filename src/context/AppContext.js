import React from 'react';
//import RNSimData from 'react-native-sim-data';
const AppContext = React.createContext();

const AppContextProvider = props => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userId, setUserId] = React.useState(props?.userId);
  const [token, setToken ] = React.useState('')

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
        setToken
        //countryCodeSim,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
const useAppContext = () => React.useContext(AppContext);
export {AppContextProvider, useAppContext};

