import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

function CopyButton({ text }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Resets copy success message after 2 seconds
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <div className="copy-button">
      <button className="button is-small" onClick={handleCopy}>
        <FaCopy /> Copy
      </button>
      {copySuccess && <span className="copy-success">Copied!</span>}
    </div>
  );
}

export default CopyButton;
