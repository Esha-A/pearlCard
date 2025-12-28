function useStyles() {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      background: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
    },
    homeBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      marginRight: 16,
    },
    homeIcon: {
      fontSize: 28,
      color: 'black',
      verticalAlign: 'middle',
    },
    title: {
      fontSize: 28,
      color: '#222',
    },
    userMenuWrap: {
      position: 'relative',
      marginLeft: 'auto',
    },
    userBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
    },
    userIcon: {
      fontSize: 28,
      marginLeft: 8,
      verticalAlign: 'middle',
    },
    dropdown: {
      position: 'absolute',
      top: 36,
      right: 0,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      borderRadius: 4,
      minWidth: 160,
      zIndex: 100,
    },
    dropdownBtn: {
      width: '100%',
      padding: '10px 16px',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
    },
    logoutBtn: {
      color: '#d9534f',
    },
  };
}

export default function Header({ userDropdownOpen, setUserDropdownOpen, onNavigate }) {
  const styles = useStyles();
  return (
    <header style={styles.header}>
      <button
        style={styles.homeBtn}
        onClick={() => onNavigate('main')}
        aria-label="Home"
      >
        <span style={styles.homeIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 2 7.5V14a1 1 0 0 0 1 1h3.5a.5.5 0 0 0 .5-.5V11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3.5a.5.5 0 0 0 .5.5H13a1 1 0 0 0 1-1V7.5a.5.5 0 0 0-.146-.354l-6-6z"/>
          </svg>
        </span>
      </button>
      <h1 className="text-center mb-0 flex-grow-1" style={styles.title}>PearlCard Journeys</h1>
      <div style={styles.userMenuWrap}>
        <button
          style={styles.userBtn}
          onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          aria-label="User Menu"
        >
          <span style={styles.userIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M8 9a5 5 0 0 0-5 5v.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14a5 5 0 0 0-5-5z"/>
            </svg>
          </span>
        </button>
        {userDropdownOpen && (
          <div style={styles.dropdown}>
            <button style={styles.dropdownBtn} onClick={() => onNavigate('account')}>My Account</button>
            <button style={styles.dropdownBtn} onClick={() => onNavigate('pearlcard')}>PearlCard Info</button>
            <button style={{ ...styles.dropdownBtn, ...styles.logoutBtn }} onClick={() => onNavigate('logout')}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
