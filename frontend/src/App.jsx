import React, { useState, useEffect, useContext } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { UserContext, UserProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useContext(UserContext);

  const getRoot = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('/root', requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log('Error in connecting to backend');
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getRoot();
  }, []);

  return (
    <UserProvider>
      <Header title={message} token={token} onLogout={() => setToken(null)} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-half">
          {token ? (
            <Home />
          ) : (
            <div className="columns">
              <Register />
              <Login />
            </div>
          )}
        </div>
        <div className="column"></div>
      </div>
    </UserProvider>
  );
}

export default App;
