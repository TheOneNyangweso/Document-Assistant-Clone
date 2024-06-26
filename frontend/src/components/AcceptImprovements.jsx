import React, { useState } from 'react';
import FormatSuggestions from '../utilities/Preformat';
import axios from 'axios';
import '../styles/styles.css'; // CSS file
import '../styles/renderer.css';

const AcceptImprovements = ({ suggestion, improvedFilePath, onAccept }) => {
  const [feedback, setFeedback] = useState(null);

  const handleAccept = async () => {
    // Extract the path from improvedFilePath (due to a bug)
    const path = new URL(improvedFilePath).pathname.substring(1);
    const payload = { payload: suggestion, path: path };
    console.log('Sending payload to backend:', payload);

    try {
      const response = await axios.post(
        'http://0.0.0.0:8003/chat/api/v0/improved',
        payload
      );

      const result = response.data;
      setFeedback('Suggestion accepted');
      onAccept(result.improved_file_path);
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('Invalid URL error:', error);
        alert('Invalid URL. Please check the path and try again.');
      } else {
        console.error('Error accepting improvement:', error);
        setFeedback('Error accepting suggestion');
      }
    }
  };

  const handleReject = () => {
    setFeedback('Suggestion rejected');
    onAccept(improvedFilePath); // No change if rejected
  };

  return (
    <div className="suggestion-container">
      <h3 className="title is-4 has-text-success">Suggestions:</h3>
      <ul>{FormatSuggestions(suggestion)}</ul>
      <button className="button is-success m-2" onClick={handleAccept}>
        Accept
      </button>
      <button className="button is-danger m-2" onClick={handleReject}>
        Reject
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default AcceptImprovements;
