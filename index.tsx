import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './LanguageContext.tsx';

const initializeApp = (retryCount = 0) => {
  const container = document.getElementById('root');
  
  // Handle potential race condition where the element isn't ready yet
  if (!container && retryCount < 5) {
    console.warn(`Anonymity Engine: Root not found, retrying... (${retryCount + 1}/5)`);
    setTimeout(() => initializeApp(retryCount + 1), 100);
    return;
  }

  if (!container) {
    console.error('Fatal: Root container not found after retries.');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
    console.log('Anonymity Engine: Mounted Successfully');
    // Signal to index.html that the app is ready to hide the loader
    window.dispatchEvent(new Event('app-ready'));
  } catch (error) {
    console.error('Critical Initialization Failure:', error);
    container.innerHTML = `
      <div style="color: white; padding: 40px; text-align: center; font-family: sans-serif; background: #0f172a; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #6366f1; margin-bottom: 20px;">Secure Uplink Interrupted</h1>
        <p style="opacity: 0.7; max-width: 400px; margin-bottom: 30px;">An error occurred while initializing the secure environment. This may be caused by an ad-blocker or network filter.</p>
        <button onclick="window.location.reload()" style="background: #6366f1; color: white; border: none; padding: 16px 32px; border-radius: 12px; cursor: pointer; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);">
          Re-establish Connection
        </button>
      </div>
    `;
  }
};

// Start initialization once the document is interactive
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initializeApp();
} else {
  document.addEventListener('DOMContentLoaded', () => initializeApp());
}
