import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div> 123 </div>
  <button>1</button>
  </>

)

// root.render(
//   // React严格模式和use strict不一样
//   <React.StrictMode>
//     <div>123</div>
//   </React.StrictMode>
// );

// fetch('/jian/subscriptions/recommended_collections')
//   .then(response => response.json())
//   .then(value => {
//     console.log(value);
//   })

// fetch('/zhi/news/latest')
//   .then(response => response.json())
//   .then(value => {
//     console.log(value);
//   })