import React from 'react';

const Smodal = ({ show, onClose, children }) =>{
  if (!show) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button (optional) */}
        <div>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    margin:'0px',
    background: 'white',
    padding: 'auto',
    borderRadius: '8px',
    maxWidth: 'auto',
    width: '50%', // Set width to 90% of the viewport
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Optional shadow for depth
    position: 'relative',
  },
};

export default Smodal;
