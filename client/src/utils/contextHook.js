import React, { useContext, useState, useEffect } from 'react';
import { logout, isLoggedIn } from '../actions/auth';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };
  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    const { status, data } = await isLoggedIn();
    if (status === 'success' && data.user) {
      saveUser(data.user);
    } else {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    const { status, data } = await logout();
    if (status === 'success') {
      removeUser();
    } else {
      console.log(data.message || 'There was an errror');
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
