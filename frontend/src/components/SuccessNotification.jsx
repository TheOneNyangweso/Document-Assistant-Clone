import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

function Notification({ message, duration = 3000, onClose }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 10; // Update interval in milliseconds
    const steps = duration / interval;
    const decrement = 100 / steps;

    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrement, 0));
    }, interval);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  return (
    show && (
      <div className="notification is-success fixed-top">
        <button
          className="delete"
          onClick={() => {
            setShow(false);
            if (onClose) onClose();
          }}
        ></button>
        <p>{message}</p>
        <progress
          className="progress is-small is-primary"
          value={progress}
          max="100"
        ></progress>
      </div>
    )
  );
}

export default Notification;
