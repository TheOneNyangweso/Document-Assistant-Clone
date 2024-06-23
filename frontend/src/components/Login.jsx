import React, { useContext, useState } from 'react';
import ErrorMessage from './ErrorMessages';
import Notification from './SuccessNotification';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    try {
      const response = await fetch('/user/login', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.detail ||
            'Error occurred during login. Kindly check your password or username'
        );
      } else {
        setToken(data.access_token);
        setSuccessMessage('Login successful.');
        setEmail('');
        setPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Network error: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
      </form>
      {successMessage && (
        <Notification
          message={successMessage}
          duration={3000}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
}

export default Login;
