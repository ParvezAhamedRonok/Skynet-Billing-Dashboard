import React from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";

const AddPaymentModal = ({ paymentModal, setPaymentModal, handleAddPayment }) => {
  if (!paymentModal.show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaDollarSign style={{ color: "#16a34a", fontSize: "1.4rem" }} />
            <h2 style={titleStyle}>Add Payment</h2>
          </div>
          <FaTimes
            onClick={() => setPaymentModal({ show: false, user: null, amount: '' })}
            style={{ cursor: "pointer", fontSize: "1.3rem", color: "#555" }}
          />
        </div>

        {/* Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="number"
            placeholder="Enter amount"
            value={paymentModal.amount}
            onChange={(e) => setPaymentModal({ ...paymentModal, amount: e.target.value })}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <div style={btnGroup}>
          <button
            style={cancelBtn}
            onClick={() => setPaymentModal({ show: false, user: null, amount: '' })}
          >
            Cancel
          </button>
          <button
            style={saveBtn}
            onClick={handleAddPayment}
          >
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;

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
  padding: "25px 20px",
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

const inputStyle = {
  padding: "12px 14px",
  fontSize: "1rem",
  borderRadius: "12px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "0.3s",
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

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  transition: "0.3s",
};
