import React from 'react';
const AppContext = React.createContext();

const AppContextProvider = props => {
  const [currentUser, setCurrentUser] = React.useState(null);

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
const useAppContext = () => React.useContext(AppContext);
export {AppContextProvider, useAppContext};
