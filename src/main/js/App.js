import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import Home_post from './components/Home_post';
// import '../resources/static/main.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home_post />
  </React.StrictMode>
);