import React from "react";
import { FaEdit } from "react-icons/fa";

const EditUserModal = ({
  editModal,
  setEditModal,
  saveEdit,
}) => {
  if (!editModal.show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <FaEdit style={{ marginRight: "8px", color: "#007bff" }} />
          <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Edit Field</h2>
        </div>

        <input
          type="text"
          placeholder="Enter new value"
          value={editModal.value}
          onChange={(e) =>
            setEditModal({ ...editModal, value: e.target.value })
          }
          style={inputStyle}
        />

        <div style={btnGroup}>
          <button
            style={cancelBtn}
            onClick={() =>
              setEditModal({ show: false, userId: null, field: "", value: "" })
            }
          >
            Cancel
          </button>
          <button style={saveBtn} onClick={saveEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "10px",
};

const modalStyle = {
  background: "#fff",
  padding: "25px 20px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "2px solid #eee",
  paddingBottom: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  transition: "0.3s",
};

const btnGroup = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const cancelBtn = {
  background: "#ccc",
  color: "#000",
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  transition: "0.3s",
};

const saveBtn = {
  background: "#007bff",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  transition: "0.3s",
};
