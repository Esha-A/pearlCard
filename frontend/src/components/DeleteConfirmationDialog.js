import React from "react";

function useStyles() {
  return {
    overlay: {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1050,
    },
    dialog: {
      position: 'relative',
      margin: '40px auto',
      maxWidth: 400,
      width: '90%',
      zIndex: 1060,
    },
    content: {
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px 12px 20px',
      borderBottom: '1px solid #e0e0e0',
    },
    title: {
      fontSize: 20,
      fontWeight: 600,
      margin: 0,
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: 24,
      cursor: 'pointer',
      color: '#888',
      marginLeft: 8,
    },
    body: {
      padding: '18px 20px 10px 20px',
      fontSize: 16,
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: '12px 20px 16px 20px',
      borderTop: '1px solid #e0e0e0',
    },
    btn: {
      padding: '7px 18px',
      fontSize: 15,
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      marginLeft: 6,
    },
    secondary: {
      background: '#6c757d',
      color: '#fff',
    },
    danger: {
      background: '#d9534f',
      color: '#fff',
    },
  };
}

export default function DeleteConfirmationDialog({ open, count, onCancel, onConfirm }) {
  const styles = useStyles();
  if (!open) return null;
  return (
    <div style={styles.overlay} tabIndex="-1">
      <div style={styles.dialog}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h5 style={styles.title}>Confirm Delete</h5>
            <button type="button" style={styles.closeBtn} onClick={onCancel}>&times;</button>
          </div>
          <div style={styles.body}>
            <p>Are you sure you want to delete {count} journey{count > 1 ? 's' : ''}? <br /> <b>This action cannot be undone.</b></p>
          </div>
          <div style={styles.footer}>
            <button type="button" style={{ ...styles.btn, ...styles.secondary }} onClick={onCancel}>Cancel</button>
            <button type="button" style={{ ...styles.btn, ...styles.danger }} onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
