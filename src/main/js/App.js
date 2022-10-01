import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import Home from './components/Home';
// import '../resources/static/main.css';
// import './style.css';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';

function App() {
  // const [currentUsername, setCurrentUsername] = useState("");

  // async function getCurrentUsername() {
  //   const res = await fetch("/api/username");
  //   const currentUsername = await res.json();
  //   console.log(currentUsername);
  //   setCurrentUsername(currentUsername.username);
  // }

  // useEffect(() => {
  //   getCurrentUsername();
  // }, []);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/" element={<Home_post />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <NavigationBar />
      {/* {(currentUsername == "") ? <Login /> : <Home currentUsername={currentUsername} />} */}
      <Home />
    </div>
  );
}

export default App;