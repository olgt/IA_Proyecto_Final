import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ColorModeProvider from './Context/ColorModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorModeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ColorModeProvider>
);
