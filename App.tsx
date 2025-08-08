import React from 'react';

// Inline styles as fallback
const styles = {
  body: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
    padding: '0 1rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#212529'
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navLink: {
    textDecoration: 'none',
    color: '#6c757d',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  navLinkActive: {
    color: '#0d6efd'
  },
  button: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  main: {
    flex: 1,
    padding: '2rem 0'
  },
  heroSection: {
    textAlign: 'center' as const,
    marginBottom: '3rem'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: '1rem',
    lineHeight: '1.1'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#6c757d',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    marginBottom: '2rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    color: '#212529'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    boxSizing: 'border-box' as const
  },
  generateButton: {
    width: '100%',
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  previewArea: {
    backgroundColor: '#f3f4f6',
    padding: '3rem 2rem',
    borderRadius: '0.5rem',
    border: '2px dashed #d1d5db',
    textAlign: 'center' as const,
    marginTop: '1.5rem'
  },
  previewText: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  footer: {
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb',
    padding: '2rem 0',
    textAlign: 'center' as const,
    color: '#6b7280'
  }
};

// Simple Logo Component
const SimpleLogo: React.FC = () => (
  <div style={{
    width: '32px',
    height: '32px',
    backgroundColor: '#0d6efd',
    borderRadius: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem'
  }}>
    QR
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [inputValue, setInputValue] = React.useState('https://example.com');

  // Simple client-side routing
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/about':
        return (
          <div style={styles.container}>
            <h1 style={{...styles.heroTitle, fontSize: '2rem'}}>About QR Pro Generator</h1>
            <div style={styles.card}>
              <p style={{color: '#6c757d', marginBottom: '1rem'}}>
                QR Pro Generator is a free tool for creating QR codes for various purposes.
              </p>
              <p style={{color: '#6c757d'}}>
                Generate QR codes for URLs, WiFi networks, business cards, and more!
              </p>
            </div>
          </div>
        );

      case '/contact':
        return (
          <div style={styles.container}>
            <h1 style={{...styles.heroTitle, fontSize: '2rem'}}>Contact Us</h1>
            <div style={styles.card}>
              <p style={{color: '#6c757d', marginBottom: '1rem'}}>
                Get in touch with us for support or feedback.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <p><strong>Email:</strong> support@qr-pro-generator.com</p>
                <p><strong>Website:</strong> https://qr-pro-generator.com</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.heroSection}>
              <h1 style={styles.heroTitle}>
                <span style={{color: '#0d6efd'}}>Free QR Code Generator</span>
                <br />
                <span style={{fontSize: '2rem', color: '#6c757d'}}>
                  Create WiFi, vCard & Business Card QR Codes
                </span>
              </h1>
              <p style={styles.heroSubtitle}>
                Generate unlimited <strong>free QR codes</strong> for websites, WiFi networks, business cards and more.
              </p>
            </div>

            {/* QR Generator Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Create Your QR Code</h2>
              
              <div style={{maxWidth: '500px', margin: '0 auto'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Enter URL or Text:</label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={styles.input}
                    placeholder="https://example.com"
                  />
                </div>
                
                <button 
                  style={styles.generateButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                  onClick={() => alert('QR Code generation coming soon!')}
                >
                  Generate QR Code
                </button>
                
                <div style={styles.previewArea}>
                  <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📱</div>
                  <p style={styles.previewText}>QR Code Preview</p>
                  <p style={{...styles.previewText, fontSize: '0.875rem'}}>
                    Enter data above to generate
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div style={{...styles.card, marginTop: '3rem'}}>
              <h2 style={styles.cardTitle}>Why Choose Our Free QR Code Generator?</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
              }}>
                <div>
                  <h3 style={{color: '#0d6efd', marginBottom: '0.5rem'}}>✅ Always Free</h3>
                  <p style={{color: '#6c757d', fontSize: '0.875rem'}}>
                    No registration or payment required
                  </p>
                </div>
                <div>
                  <h3 style={{color: '#0d6efd', marginBottom: '0.5rem'}}>🎨 Custom Design</h3>
                  <p style={{color: '#6c757d', fontSize: '0.875rem'}}>
                    Colors, logos, sizes, error correction
                  </p>
                </div>
                <div>
                  <h3 style={{color: '#0d6efd', marginBottom: '0.5rem'}}>📱 Multiple Types</h3>
                  <p style={{color: '#6c757d', fontSize: '0.875rem'}}>
                    URLs, WiFi, vCard, Email, SMS, Phone
                  </p>
                </div>
                <div>
                  <h3 style={{color: '#0d6efd', marginBottom: '0.5rem'}}>💼 Commercial Use</h3>
                  <p style={{color: '#6c757d', fontSize: '0.875rem'}}>
                    Free for business and personal use
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <button 
            style={styles.logo} 
            onClick={() => navigate('/')}
          >
            <SimpleLogo />
            <span style={styles.logoText}>QR Pro Generator</span>
          </button>
          
          <ul style={styles.navLinks}>
            <li>
              <button
                style={{
                  ...styles.navLink,
                  ...(currentPath === '/' ? styles.navLinkActive : {}),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                style={{
                  ...styles.navLink,
                  ...(currentPath === '/about' ? styles.navLinkActive : {}),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                style={{
                  ...styles.navLink,
                  ...(currentPath === '/contact' ? styles.navLinkActive : {}),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/contact')}
              >
                Contact
              </button>
            </li>
          </ul>
          
          <button 
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
          >
            Sign Up Free
          </button>
        </nav>
      </header>
      
      {/* Main Content */}
      <main style={styles.main}>
        {renderCurrentPage()}
      </main>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>&copy; {new Date().getFullYear()} QR Pro Generator. All rights reserved.</p>
          <p style={{fontSize: '0.875rem'}}>
            Free QR code generator for URLs, text, WiFi, business cards and more.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
