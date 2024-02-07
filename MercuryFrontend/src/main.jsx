import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');
const rootInstance = createRoot(root);

rootInstance.render(
  <React.StrictMode>
    <BrowserRouter basename="/mercury-web-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
