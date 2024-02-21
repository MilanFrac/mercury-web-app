import React, { useContext } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const rootInstance = createRoot(root);

rootInstance.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
