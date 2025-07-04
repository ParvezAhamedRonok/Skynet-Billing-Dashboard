'use client';
import { useState } from 'react';
import { billingData as initialData } from '../data/billingData';

export default function BillingApp() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    phone: '',
    common: '',
    lineTakenDate: new Date().toISOString().split('T')[0],
    bills: []
  });

  const [showBillsModal, setShowBillsModal] = useState(false);
  const [currentBillsUserId, setCurrentBillsUserId] = useState(null);

  // Edit user fields
  const handleUserChange = (id, key, value) => {
    setData(data.map(user => user.id === id ? { ...user, [key]: value } : user));
  };

  // Edit bill fields
  const handleBillChange = (userId, billIndex, key, value) => {
    setData(data.map(user => {
      if (user.id === userId) {
        const updatedBills = [...user.bills];
        updatedBills[billIndex] = { ...updatedBills[billIndex], [key]: value };
        return { ...user, bills: updatedBills };
      }
      return user;
    }));
  };

  // Add new bill to user
  const addBill = (userId) => {
    const newBill = {
      summary: '',
      dateCollected: new Date().toISOString().split('T')[0],
    };
    setData(data.map(user =>
      user.id === userId ? { ...user, bills: [...user.bills, newBill] } : user
    ));
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setData(data.filter(user => user.id !== id));
  };

  // Search filter
  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add User Modal handlers
  const handleNewUserChange = (key, value) => {
    setNewUserData(prev => ({ ...prev, [key]: value }));
  };

  const submitNewUser = () => {
    if (!newUserData.name.trim() || !newUserData.phone.trim()) {
      alert('Name and Phone are required');
      return;
    }
    const userToAdd = { ...newUserData, id: Date.now(), bills: [] };
    setData([userToAdd, ...data]);
    setShowAddUserModal(false);
    setNewUserData({
      name: '',
      phone: '',
      common: '',
      lineTakenDate: new Date().toISOString().split('T')[0],
      bills: []
    });
  };

  // Show bills popup
  const openBillsModal = (userId) => {
    setCurrentBillsUserId(userId);
    setShowBillsModal(true);
  };

  // Current user's bills for popup
  const currentUserBills = currentBillsUserId !== null
    ? data.find(u => u.id === currentBillsUserId)?.bills || []
    : [];

  // Cancel handlers
  const cancelAddUser = () => {
    setShowAddUserModal(false);
    setNewUserData({
      name: '',
      phone: '',
      common: '',
      lineTakenDate: new Date().toISOString().split('T')[0],
      bills: []
    });
  };

  const cancelBillsModal = () => {
    setShowBillsModal(false);
    setCurrentBillsUserId(null);
  };

  // Remove bill inside bills popup (optional)
  const removeBill = (userId, billIndex) => {
    setData(data.map(user => {
      if (user.id === userId) {
        const updatedBills = [...user.bills];
        updatedBills.splice(billIndex, 1);
        return { ...user, bills: updatedBills };
      }
      return user;
    }));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>📊 Skynet Billing Dashboard for Bulbul Mama</h1>

      <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by Name, Phone or Common Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', flex: 1, borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={() => setShowAddUserModal(true)}
          style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', borderRadius: '5px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          ➕ Add User
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Bari-Wala</th>
              <th style={thStyle}>Line Taken</th>
              <th style={thStyle}>Bills (Last 2 + More)</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => (
              <tr key={user.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}><input value={user.name} onChange={(e) => handleUserChange(user.id, 'name', e.target.value)} style={inputStyle} /></td>
                <td style={tdStyle}><input value={user.phone} onChange={(e) => handleUserChange(user.id, 'phone', e.target.value)} style={inputStyle} /></td>
                <td style={tdStyle}><input value={user.common} onChange={(e) => handleUserChange(user.id, 'common', e.target.value)} style={inputStyle} /></td>
                <td style={tdStyle}><input type="date" value={user.lineTakenDate} onChange={(e) => handleUserChange(user.id, 'lineTakenDate', e.target.value)} style={inputStyle} /></td>
                <td>
                  <div style={tdStyle2}>

                    {user.bills.slice(-2).map((bill, i) => (
                      <div key={i} style={{ marginBottom: '8px' }}>
                        <span style={{
                          backgroundColor: '#22c55e',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          display: 'inline-block',
                        }}>
                          {bill.summary || 'Tk 0'}
                        </span>
                        <br />
                        <span style={{ fontSize: '8px', color: '#6b7280', textAlign:'center', marginLeft:'7px' }}>{bill.dateCollected}</span>
                      </div>
                    ))}
                  </div>

                  {user.bills.length > 2 && (
                    <button
                      onClick={() => openBillsModal(user.id)}
                      style={{
                        fontSize: '13px',
                        marginTop: '6px',
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Show All Bills
                    </button>
                  )}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <Modal onClose={cancelAddUser} title="Add New User">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newUserData.name}
              onChange={e => handleNewUserChange('name', e.target.value)}
              style={modalInputStyle}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUserData.phone}
              onChange={e => handleNewUserChange('phone', e.target.value)}
              style={modalInputStyle}
            />
            <input
              type="text"
              placeholder="Common Name"
              value={newUserData.common}
              onChange={e => handleNewUserChange('common', e.target.value)}
              style={modalInputStyle}
            />
            <label>
              Line Taken Date:
              <input
                type="date"
                value={newUserData.lineTakenDate}
                onChange={e => handleNewUserChange('lineTakenDate', e.target.value)}
                style={{ ...modalInputStyle, marginTop: '4px' }}
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={cancelAddUser} style={modalBtnCancel}>Cancel</button>
              <button onClick={submitNewUser} style={modalBtnSave}>Add User</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Bills Modal */}
      {showBillsModal && (
        <Modal onClose={cancelBillsModal} title="User Bills">
          <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {currentUserBills.length === 0 && <p>No bills available for this user.</p>}
            {currentUserBills.map((bill, index) => (
              <div key={index} style={billCardStyle}>
                <input
                  type="text"
                  value={bill.summary}
                  onChange={e => handleBillChange(currentBillsUserId, index, 'summary', e.target.value)}
                  placeholder="Tk Amount"
                  style={billSummaryStyle}
                />
                <input
                  type="date"
                  value={bill.dateCollected}
                  onChange={e => handleBillChange(currentBillsUserId, index, 'dateCollected', e.target.value)}
                  style={billDateStyle}
                />
                <button
                  onClick={() => removeBill(currentBillsUserId, index)}
                  style={billCancelBtnStyle}
                  title="Remove this bill"
                >
                  Cancel
                </button>
              </div>
            ))}
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={cancelBillsModal} style={{ ...modalBtnCancel, padding: '8px 18px' }}>Cancel</button>
              <button
                onClick={() => addBill(currentBillsUserId)}
                style={{ ...modalBtnSave, padding: '8px 18px', backgroundColor: '#10b981' }}
              >
                ➕ Add Bill
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9999,
          cursor: 'pointer',
        }}
      />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          width: '400px',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 10000,
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '20px', fontWeight: '700' }}>{title}</h2>
        {children}
      </div>
    </>
  );
}

// Styles

const thStyle = {
  padding: '12px',
  border: '1px solid #d1d5db',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #e5e7eb',
  verticalAlign: 'top'
};
const tdStyle2 = {
  padding: '10px',
  border: '1px solid #e5e7eb',
  display: 'flex',
  flexWrap: 'wrap',
  gap:'15px'
};

const inputStyle = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
  marginTop: '4px'
};

const modalInputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '14px',
  boxSizing: 'border-box',
  marginTop: '6px',
  marginBottom: '10px',
};

const modalBtnCancel = {
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 14px',
  cursor: 'pointer'
};

const modalBtnSave = {
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 14px',
  cursor: 'pointer'
};

const billCardStyle = {
  backgroundColor: '#f8fafc', // subtle off-white background
  padding: '20px',
  borderRadius: '16px',
  marginBottom: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', // soft elevation
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  position: 'relative',
  border: '1px solid #e2e8f0', // light border
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  overflow: 'hidden',
};

const billCardHoverStyle = {
  transform: 'scale(1.02)', // subtle hover scale
};

const billSummaryStyle = {
  backgroundColor: '#16a34a', // deeper emerald green
  color: '#ffffff',
  padding: '10px 2px',
  borderRadius: '9999px', // full pill
  fontWeight: '600',
  fontSize: '15px',
  textAlign: 'center',
  width: 'fit-content',
  alignSelf: 'flex-start',
  boxShadow: '0 2px 6px rgba(22, 163, 74, 0.3)',
};


const billDateStyle = {
  fontSize: '13px',
  color: '#4b5563', // gray-700
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  padding: '6px 10px',
  width: '140px',
  outline: 'none',
  cursor: 'pointer',
  marginTop: '6px'
};

const billCancelBtnStyle = {
  position: 'absolute',
  top: '12px',
  right: '16px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 8px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600',
  userSelect: 'none',
};
