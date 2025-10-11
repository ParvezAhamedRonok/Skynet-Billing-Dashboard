import React from "react";
import { FaUser, FaPhone, FaNetworkWired, FaHome, FaInfoCircle, FaStickyNote, FaCalendarAlt } from "react-icons/fa";

const AddUserModal = ({ onClose, newUser, setNewUser, handleAddUser }) => {
  const fields = [
    { key: "name", placeholder: "Full Name", icon: <FaUser /> },
    { key: "phone", placeholder: "Phone Number", icon: <FaPhone /> },
    { key: "ip", placeholder: "IP Address", icon: <FaNetworkWired /> },
    { key: "address", placeholder: "Bari-Wala", icon: <FaHome /> },
    { key: "details", placeholder: "Details", icon: <FaInfoCircle /> },
    { key: "information", placeholder: "Information", icon: <FaStickyNote /> },
    { key: "lineTakenDate", placeholder: "Line Taken Date", icon: <FaCalendarAlt />, type: "date" },
  ];

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(6px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      padding: "15px",
    },
    modal: {
      background: "#fff",
      borderRadius: "18px",
      maxWidth: "480px",
      width: "100%",
      padding: "28px 24px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
      animation: "fadeIn 0.35s ease",
      border: "1px solid rgba(0,0,0,0.08)",
      marginLeft:'-20px'
    },
    title: {
      fontSize: "22px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "24px",
      color: "#222",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "24px",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      position: "absolute",
      left: "12px",
      color: "#777",
      fontSize: "16px",
    },
    input: {
      width: "100%",
      padding: "12px 12px 12px 38px",
      fontSize: "15px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      transition: "all 0.25s ease",
      outline: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 6px rgba(0,123,255,0.25)",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
    cancelBtn: {
      backgroundColor: "#f3f4f6",
      color: "#333",
      border: "1px solid #ddd",
      padding: "10px 22px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.25s ease",
    },
    saveBtn: {
      background: "linear-gradient(90deg, #007bff 0%, #0056d6 100%)",
      color: "#fff",
      border: "none",
      padding: "10px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.25s ease",
    },
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = styles.inputFocus.borderColor;
    e.target.style.boxShadow = styles.inputFocus.boxShadow;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#ccc";
    e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Add New User</h2>
        <div style={styles.formGroup}>
          {fields.map((field) => (
            <div key={field.key} style={styles.inputWrapper}>
              <span style={styles.icon}>{field.icon}</span>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={newUser[field.key] || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, [field.key]: e.target.value })
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
              />
            </div>
          ))}
        </div>
        <div style={styles.buttonGroup}>
          <button
            style={styles.cancelBtn}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={styles.saveBtn}
            onMouseEnter={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #0069d9, #004bb5)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #007bff, #0056d6)")
            }
            onClick={handleAddUser}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
