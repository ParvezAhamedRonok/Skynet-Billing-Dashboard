import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaUserTie, FaTimes } from "react-icons/fa";

const UserBillsModal = ({ detailsModal, setDetailsModal }) => {
  if (!detailsModal.show) return null;

  const user = detailsModal.user || {};
  const bills = user.bills || [];

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaMoneyBillWave style={{ color: "#16a34a", fontSize: "1.4rem" }} />
            <h2 style={titleStyle}>All Bills — {user.name || "Unknown"}</h2>
          </div>
          <FaTimes
            onClick={() => setDetailsModal({ show: false, user: null })}
            style={{ cursor: "pointer", fontSize: "1.3rem", color: "#555" }}
          />
        </div>

        {/* Bill List */}
        <div style={billsContainer}>
          {bills.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777", fontStyle: "italic" }}>
              No bills found for this user.
            </p>
          ) : (
            bills.map((bill, idx) => (
              <div key={idx} style={billCard}>
                <div style={billInfoLeft}>
                  <FaUserTie style={iconStyle} />
                  <span style={billTextMain}>{bill.takenBy || "—"}</span>
                </div>

                <div style={billInfoCenter}>
                  <FaCalendarAlt style={iconStyle} />
                  <span style={billDate}>{bill.dateCollected || "N/A"}</span>
                </div>

                <div style={billInfoRight}>
                  <span style={billAmount}>{bill.summary || "0"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBillsModal;

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
  maxWidth: "500px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxHeight: "85vh",
  overflowY: "auto",
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
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "#333",
};

const billsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const billCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "12px 14px",
  background: "#f9fafb",
  transition: "0.3s",
  flexWrap: "wrap",
};

const billInfoLeft = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  flex: "1",
  minWidth: "100px",
};

const billInfoCenter = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  flex: "1",
  justifyContent: "center",
  minWidth: "100px",
};

const billInfoRight = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flex: "1",
  minWidth: "100px",
};

const billTextMain = {
  fontWeight: 500,
  color: "#111",
};

const billDate = {
  fontSize: "0.9rem",
  color: "#555",
};

const billAmount = {
  fontWeight: 600,
  color: "#16a34a",
};

const iconStyle = {
  color: "#555",
  fontSize: "1rem",
};
