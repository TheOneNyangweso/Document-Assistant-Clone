import React from 'react';

function SuccessMessage({ message }) {
  return (
    message && (
      <p className="has-text-weight-bold has-text-success">{message}</p>
    )
  );
}

export default SuccessMessage;
