import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Header({ title, token, onLogout }) {
  const [, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authenticatedUserToken');
    window.location.reload(); // Reload the page after logout - This is only a workaround, will address the big later
    // Redirect logic to be added here if necessary
  };

  return (
    <div className="has-text-centered m-6">
      <h1 className="title">{title}</h1>
      {token ? (
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div>{/* To add navigation links here if needed */}</div>
      )}
    </div>
  );
}

export default Header;
