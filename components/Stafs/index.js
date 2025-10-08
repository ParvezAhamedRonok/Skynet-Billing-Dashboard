'use client';
import { useState } from 'react';
import { billingData as initialData } from '../../data/billingData';

export default function BillingApp() {
  const [data] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommon, setSelectedCommon] = useState(
    [...new Set(initialData.map(u => u.common))][0] || ''
  );

  // Only details modal (read-only)
  const [detailsModal, setDetailsModal] = useState({ show: false, user: null });

  // Dropdown options
  const uniqueCommons = [...new Set(data.map(u => u.common))];

  // Filter (unchanged)
  const filteredData = data.filter(user =>
    user.common === selectedCommon &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.address.toLowerCase().includes(searchTerm))
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#111827' }}>
        📊 Skynet Billing Dashboard
      </h1>

      {/* Controls (same) */}
      <div style={{ display: 'flex', marginBottom: '20px', gap: '10px', alignItems: 'center' }}>
        <select
          value={selectedCommon}
          onChange={(e) => {
            setSelectedCommon(e.target.value);
          }}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: '15px',
          }}
        >
          {uniqueCommons.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="🔍 Search by name, phone, or bari-wala..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            flex: 1,
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: '15px',
          }}
        />
      </div>

      {/* Table (read-only) */}
      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: '950px', width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>IP</th>
              <th style={thStyle}>Bari-Wala</th>
              <th style={thStyle}>Line Taken</th>
              <th style={thStyle}>Bills</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => {
              const hasPaidThisMonth = user.bills.some(bill => {
                const billDate = new Date(bill.dateCollected);
                const now = new Date();
                return billDate.getFullYear() === now.getFullYear() && billDate.getMonth() === now.getMonth();
              });

              return (
                <tr key={user.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {hasPaidThisMonth ? (
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
                        readOnly
                        style={{ width: '20px', height: '20px', accentColor: '#2563eb', cursor: 'default' }}
                      />
                    )}
                  </td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>{user.ip}</td>
                  <td style={tdStyle}>{user.address}</td>
                  <td style={tdStyle}>{user.lineTakenDate}</td>
                  <td style={tdStyle2}>
                    {user.bills.slice(-2).map((bill, i) => (
                      <div key={i} style={{ marginBottom: '6px' }}>
                        <span style={billChip}>{bill.summary}</span>
                        <div style={{ fontSize: '9px', textAlign: 'center', color: '#6b7280', marginTop: '2px' }}>{bill.dateCollected}</div>
                      </div>
                    ))}
                    {user.bills.length > 2 && (
                      <span
                        style={{ marginLeft: '6px', cursor: 'pointer', color: '#2563eb', fontSize: '13px', whiteSpace: 'nowrap' }}
                        onClick={() => setDetailsModal({ show: true, user })}
                      >
                        🔍 More
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Details Modal (read-only) */}
      {detailsModal.show && (
        <Modal onClose={() => setDetailsModal({ show: false, user: null })} title="All Bills">
          {detailsModal.user?.bills.map((bill, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '10px 12px',
                marginBottom: '8px',
                background: '#f9fafb'
              }}
            >
              <span style={{ flex: 1, fontWeight: '500' }}>{bill.takenBy}</span>
              <span style={{ flex: 1, textAlign: 'center', fontSize: '13px', color: '#555' }}>{bill.dateCollected}</span>
              <span style={{ flex: 1, textAlign: 'right', fontWeight: '600', color: '#16a34a' }}>{bill.summary}</span>
            </div>
          ))}
        </Modal>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button style={modalBtnClose} onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

/* Styles */
const thStyle = { padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left', fontWeight: '600' };
const tdStyle = { padding: '10px', border: '1px solid #f3f4f6', whiteSpace: 'nowrap', verticalAlign: 'middle' };
const tdStyle2 = { padding: '10px', border: '1px solid #f3f4f6', whiteSpace: 'nowrap', display: 'flex', gap: '8px', alignItems: 'center' };
const billChip = { background: '#2563eb', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: '500', display: 'inline-block' };
const modalBtnClose = { background: '#d1d5db', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer' };
