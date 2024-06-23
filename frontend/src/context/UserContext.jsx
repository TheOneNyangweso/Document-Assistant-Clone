import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserProvider(props) {
  const [token, setToken] = useState(
    localStorage.getItem('authenticatedUserToken')
  );

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const response = await fetch('/user/token', requestOptions);

        if (!response.ok) {
          setToken(null);
          localStorage.removeItem('authenticatedUserToken');
        } else {
          localStorage.setItem('authenticatedUserToken', token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        setToken(null);
        localStorage.removeItem('authenticatedUserToken');
      }
    };

    getUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
