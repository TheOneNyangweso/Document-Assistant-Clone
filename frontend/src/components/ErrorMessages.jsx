import React from 'react';

function ErrorMessage({ message }) {
  return (
    message && <p className="has-text-weight-bold has-text-danger">{message}</p>
  );
}

export default ErrorMessage;
