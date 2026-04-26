'use client';
import { useState } from 'react';
import { billingData as initialData } from '../../data/billingData';
import AddUserModal from "../_libs/AddUserModal"; // adjust path if needed
import EditUserModal from "../_libs/EditUserModal";
import UserBillsModal from "../_libs/UserBillsModal";
import ConfirmDeleteModal from "../_libs/ConfirmDeleteModal";
import AddPaymentModal from "../_libs/AddPaymentModal";

// import UserBillsModal from "../_libs/UserBillsModal";
// import ConfirmDeleteModal from "../_libs/ConfirmDeleteModal";
// import AddPaymentModal from "../_libs/AddPaymentModal";



export default function BillingApp({ customers }) {
  const [data, setData] = useState(customers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommon, setSelectedCommon] = useState(
    [...new Set(customers.map(u => u.common))][0] || ''
  );
  const [showNotPaidOnly, setShowNotPaidOnly] = useState(false);

  // Modals
  const [editModal, setEditModal] = useState({ show: false, userId: null, field: '', value: '' });
  const [detailsModal, setDetailsModal] = useState({ show: false, user: null });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, user: null });
  const [addModal, setAddModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ show: false, user: null, amount: '' });

  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    common: selectedCommon,
    ip: '',
    address: '',
    details: '',
    information: '',
    lineTakenDate: '',
    bills: [],
  });

  const hasPaidThisMonth = (user) => {
    const now = new Date();
    return user.bills.some(bill => {
      const billDate = new Date(bill.dateCollected);
      return billDate.getFullYear() === now.getFullYear() && billDate.getMonth() === now.getMonth();
    });
  };

  // Save edit
  const saveEdit = () => {
    if (!editModal.userId) return;
    setData(d => d.map(u =>
      u.id === editModal.userId ? { ...u, [editModal.field]: editModal.value } : u
    ));
    setEditModal({ show: false, userId: null, field: '', value: '' });
  };

  // Delete
  const handleDelete = () => {
    if (!confirmDelete.user) return;
    setData(d => d.filter(u => u.id !== confirmDelete.user.id));
    setConfirmDelete({ show: false, user: null });
  };

  // Add user
  const handleAddUser = async () => {
    if (
      !newUser.name ||
      !newUser.phone ||
      !newUser.ip ||
      !newUser.address ||
      !newUser.details ||
      !newUser.information
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = {
      ...newUser,
      id: Date.now(), // you’re sending id also
      common: selectedCommon,
    };

    try {
      const res = await fetch("https://crud-with-mongo-express.onrender.com/api/Skynet/add-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // ✅ Update local state only if request was successful
      setData(d => [...d, data.data]); // backend returns { success, data }
      setNewUser({
        name: "",
        phone: "",
        common: selectedCommon,
        ip: "",
        address: "",
        details: "",
        information: "",
        lineTakenDate: "",
        bills: [],
      });
      setAddModal(false);

      alert("User added successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user. Check console for details.");
    }
  };


  // Add payment & Update user 
  const handleAddPayment = () => {
    const amt = String(paymentModal.amount).trim();
    if (!amt || isNaN(Number(amt))) {
      alert("Please enter a valid amount.");
      return;
    }
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');

    const newBill = {
      summary: `$ ${amt}`,
      dateCollected: now.toISOString().split('T')[0],  // YYYY-MM-DD
      month: `${y}-${m}`,
      takenBy: 'Admin', // it will be the name of login details
    };

    setData(d => d.map(u =>
      u.id === paymentModal.user.id
        ? { ...u, bills: [...u.bills, newBill] }
        : u
    ));
    //i can add data to the database in here also after successfully sending the money..


    setPaymentModal({ show: false, user: null, amount: '' });
  };

  // Dropdown options
  const uniqueCommons = [...new Set(data.map(u => u.common))];

  // Filter rows
  let filteredData = data.filter(user =>
    user.common === selectedCommon &&
    (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase())
      // user.details.includes(searchTerm.toLowerCase()) ||
      // user.information.includes(searchTerm.toLowerCase())
    )
  );

  if (showNotPaidOnly) {
    filteredData = filteredData.filter(u => !hasPaidThisMonth(u));
  }

  return (
    <div style={{ padding: '10px', fontFamily: 'Segoe UI, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#111827' }}>
        📊 Skynet Billing Dashboard
      </h1>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // ✅ allow wrapping on smaller screens
          marginBottom: "20px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <select
          value={selectedCommon}
          onChange={(e) => {
            setSelectedCommon(e.target.value);
            setNewUser((prev) => ({ ...prev, common: e.target.value }));
          }}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
            flex: "1 1 200px", // ✅ flexible width
            minWidth: "150px",
          }}
        >
          {uniqueCommons.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="🔍 Search by name, phone, or bari-wala..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            flex: "2 1 250px", // ✅ takes more space on desktop
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
            minWidth: "180px",
          }}
        />

        <button
          onClick={() => setShowNotPaidOnly((prev) => !prev)}
          style={{
            background: showNotPaidOnly ? "#16a34a" : "#f59e0b",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            flex: "1 1 70px",
            minWidth: "100px",
          }}
        >
          {showNotPaidOnly ? "Show All" : "Show Not Paid"}
        </button>

        <button
          onClick={() => setAddModal(true)}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            flex: "1 1 60px",
            minWidth: "100px",
          }}
        >
          ➕ Add User
        </button>
      </div>


      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: '950px', width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>IP</th>
              <th style={thStyle}>Bari-Wala</th>
              <th style={thStyle}>Details</th>
              <th style={thStyle}>informations</th>
              <th style={thStyle}>Line Taken</th>
              <th style={thStyle}>Bills</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => {
              const paid = hasPaidThisMonth(user);

              return (
                <tr key={user.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {paid ? (
                      <span style={{
                        backgroundColor: '#16a34a',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'inline-block',
                      }}>✔</span>
                    ) : (
                      <input
                        type="checkbox"
                        style={{ width: '20px', height: '20px', accentColor: '#2563eb', cursor: 'pointer' }}
                        onClick={(e) => { e.preventDefault(); setPaymentModal({ show: true, user, amount: '' }); }}
                      />
                    )}
                  </td>

                  <td style={tdStyle}>
                    {user.name}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'name', value: user.name })}
                    >✏️</span>
                  </td>

                  <td style={tdStyle}>
                    {user.phone}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'phone', value: user.phone })}
                    >✏️</span>
                  </td>

                  <td style={tdStyle}>
                    {user.ip}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'ip', value: user.ip })}
                    >✏️</span>
                  </td>

                  <td style={tdStyle}>
                    {user.address}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'address', value: user.address })}
                    >✏️</span>
                  </td>
                  <td style={tdStyle}>
                    {user.details}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'details', value: user.details })}
                    >✏️</span>
                  </td>
                  <td style={tdStyle}>
                    {user.information}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'information', value: user.information })}
                    >✏️</span>
                  </td>

                  <td style={tdStyle}>
                    {user.lineTakenDate}
                    <span
                      style={iconStyle}
                      onClick={() => setEditModal({ show: true, userId: user.id, field: 'lineTakenDate', value: user.lineTakenDate })}
                    >✏️</span>
                  </td>

                  <td style={tdStyle2}>
                    {user.bills.slice(-2).map((bill, i) => (
                      <div key={i} style={{ marginBottom: '6px' }}>
                        <span style={billStyle}>{bill.summary}</span>
                        <div style={{ fontSize: '9px', textAlign: 'center', color: '#6b7280', marginTop: '2px' }}>
                          {bill.dateCollected}
                        </div>
                      </div>
                    ))}
                    {user.bills.length > 2 && (
                      <span
                        style={{ marginLeft: '6px', cursor: 'pointer', color: '#2563eb', fontSize: '13px' }}
                        onClick={() => setDetailsModal({ show: true, user })}
                      >
                        🔍 More
                      </span>
                    )}
                  </td>

                  <td style={tdStyle}>
                    <button onClick={() => setConfirmDelete({ show: true, user })} style={deleteBtnStyle}>🗑 Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {paymentModal.show && (
        <AddPaymentModal
          paymentModal={paymentModal}
          setPaymentModal={setPaymentModal}
          handleAddPayment={handleAddPayment}
        />
      )}

      {/* Add User Modal */}
      {addModal && (
        <AddUserModal
          onClose={() => setAddModal(false)}
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
        />
      )}

      {/* Edit Modal */}
      {editModal.show && (
        <EditUserModal
          editModal={editModal}
          setEditModal={setEditModal}
          saveEdit={saveEdit}
        />
      )}

      {/* Details Modal (Show More) */}
      {detailsModal.show && (
        <UserBillsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
        />
      )}

      {/* Delete Modal */}
      {confirmDelete.show && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        width: '420px',
        zIndex: 1000,
        boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '18px', marginBottom: '15px', color: '#111827' }}>{title}</h2>
        {children}
      </div>
    </>
  );
}

// Styles
const thStyle = { padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left', fontWeight: '600' };
const tdStyle = { padding: '10px', border: '1px solid #f3f4f6', whiteSpace: 'nowrap', verticalAlign: 'middle' };
const tdStyle2 = { padding: '10px', border: '1px solid #f3f4f6', whiteSpace: 'nowrap', display: 'flex', gap: '8px', alignItems: 'center' };
const iconStyle = { marginLeft: '8px', cursor: 'pointer', fontSize: '13px', color: '#2563eb' };
const billStyle = { background: '#2563eb', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: '500' };
const deleteBtnStyle = { background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' };
const modalInputStyle = { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '15px' };
const modalBtnCancel = { background: '#d1d5db', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer' };
const modalBtnSave = { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer' };
