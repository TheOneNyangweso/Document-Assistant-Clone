import React, { useState, useEffect, useContext } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import NoPageFound from './components/NoPageFound';
import Home from './components/Home';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import './styles/styles.css';

function App() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  // useEffect(() => {
  //   if (token) {
  //     navigate('/home', { replace: true });
  //   }
  // });

  useEffect(() => {
    const publicRoutes = ['/login', '/signup'];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [token, navigate, location.pathname]);

  return (
    <>
      <Header title={message} />
      <div className="columns is-mobile is-centered">
        <div className="column m-1">
          <Routes>
            <Route
              path="/home"
              element={
                token ? (
                  <Layout token={token} setToken={setToken}>
                    <Home />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                <Layout token={token} setToken={setToken}>
                  <div className="form-width">
                    <Register />
                  </div>
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout token={token} setToken={setToken}>
                  <div className="form-width">
                    <Login />
                  </div>
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout token={token} setToken={setToken}>
                  <NoPageFound />
                </Layout>
              }
            />
          </Routes>
          {/* {!token && <Navigate to="/login" />} */}
        </div>
      </div>
      <div className="column"></div>
    </>
  );
}

export default App;
