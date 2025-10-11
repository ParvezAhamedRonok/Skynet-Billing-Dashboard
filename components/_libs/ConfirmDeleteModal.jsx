import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ConfirmDeleteModal = ({ confirmDelete, setConfirmDelete, handleDelete }) => {
  if (!confirmDelete.show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaExclamationTriangle style={{ color: "#f59e0b", fontSize: "1.4rem" }} />
            <h2 style={titleStyle}>Confirm Delete</h2>
          </div>
          <FaTimes
            onClick={() => setConfirmDelete({ show: false, user: null })}
            style={{ cursor: "pointer", fontSize: "1.3rem", color: "#555" }}
          />
        </div>

        {/* Body */}
        <p style={messageStyle}>
          ⚠️ Are you sure you want to delete <b>{confirmDelete.user?.name}</b>?
        </p>

        {/* Buttons */}
        <div style={btnGroup}>
          <button
            style={cancelBtn}
            onClick={() => setConfirmDelete({ show: false, user: null })}
          >
            Cancel
          </button>
          <button
            style={deleteBtn}
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "10px",
};

const modalStyle = {
  background: "#fff",
  padding: "25px 22px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "2px solid #eee",
  paddingBottom: "10px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "#222",
};

const messageStyle = {
  fontSize: "1rem",
  color: "#333",
};

const btnGroup = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
};

const cancelBtn = {
  background: "#f3f4f6",
  color: "#333",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  cursor: "pointer",
  fontWeight: 500,
  transition: "0.3s",
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  transition: "0.3s",
};
