import React, { useState } from 'react';

/**
 * Component for a confirmation popup.
 * Displays a popup with a confirmation message and buttons for confirmation and cancellation.
 * @param {string} message - The confirmation message to display.
 * @param {Function} onConfirm - Callback function to execute when the confirmation button is clicked.
 */
const ConfirmPopup = ({ message, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles the confirmation action.
   * Closes the popup and executes the onConfirm callback.
   */
  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  /**
   * Handles the cancellation action.
   * Closes the popup without executing any further action.
   */
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete</button>
      {isOpen && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <h3>{message}</h3>
            <div className="confirmation-popup-buttons">
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPopup;
