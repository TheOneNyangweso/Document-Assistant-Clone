import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavBar({ token, onlogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onlogout();
    localStorage.removeItem('authenticatedUserToken');

    // window.location.reload(); // Reload the page after logout - This is only a workaround, will address the big later
    //the issue I think is solved...will test to confirm
    navigate('/login');
  };
  return (
    <div className="has-text-centered m-6">
      <div className="columns is-centered">
        {token ? (
            <button className="button m-2" onClick={handleLogout}>
              Logout
            </button>

        ) : (
          <nav className="level">
            <div className="level-item has-text-centered">
              <Link
                to="/login"
                className={`button is-rounded m-2 ${
                  location.pathname === '/login' ? 'is-primary' : ''
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`button is-rounded m-2 ${
                  location.pathname === '/signup' ? 'is-primary' : ''
                }`}
              >
                Register
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

function Layout({ token, setToken, children }) {
  return (
    <div>
      <NavBar token={token} onlogout={() => setToken(null)} />
      {children}
    </div>
  );
}

export default Layout;
