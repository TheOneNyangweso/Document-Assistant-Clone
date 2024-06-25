import React, { useState } from 'react';
import ErrorMessage from './ErrorMessages';
import Notification from './SuccessNotification';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitRegistration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch('/user/signup', requestOptions);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail || 'Error occurred during registration');
      } else {
        setSuccessMessage('Registration successful! Please log in.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmationPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Network error: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 3) {
      submitRegistration();
    } else {
      setErrorMessage(
        'Ensure passwords match and number of characters is more than 3'
      );
    }
  };

  console.log('asa');
  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="text"
              placeholder="Enter First Name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              autoComplete="given-name"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              type="text"
              placeholder="Enter Last Name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              autoComplete="family-name"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
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
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Confirm password..."
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Register
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

export default Register;
