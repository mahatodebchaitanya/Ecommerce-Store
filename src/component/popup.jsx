// Popup.js
import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div style={popupStyles}>
      <p>{message}</p>
      <button onClick={onClose} style={buttonStyles}>Close</button>
    </div>
  );
};

// Styles for popup
const popupStyles = {
  position: 'fixed',
  top: '20px',
  right: '50vw',
  padding: '15px 25px',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  zIndex: 1000,
};

const buttonStyles = {
  marginTop: '10px',
  padding: '5px 10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Popup;
