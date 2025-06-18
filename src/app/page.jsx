'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    const targetRoute = isAuthenticated ? '/dashboard' : '/login';
    router.replace(targetRoute);
  }, [isAuthenticated, router]);

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <p style={styles.text}>Redirecting...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  loader: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #0070f3',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '16px',
    fontSize: '16px',
    color: '#666',
  },
};

// Add CSS animation globally (if using a global stylesheet or CSS-in-JS)
const styleSheet = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject the style for the animation if needed (quick inline solution)
if (typeof window !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}

export default HomePage;
