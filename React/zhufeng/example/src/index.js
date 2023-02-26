import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React严格模式和use strict不一样
  <React.StrictMode>
    <div>123</div>
  </React.StrictMode>
);
