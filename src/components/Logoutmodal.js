import React from 'react';

function LogoutModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Logout</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to logout?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onConfirm}>
              Logout
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
