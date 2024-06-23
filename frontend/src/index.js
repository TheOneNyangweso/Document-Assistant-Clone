import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.min.css"
import { UserProvider } from './context/UserContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Disabling strict for now
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
);
