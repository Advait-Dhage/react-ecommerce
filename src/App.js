import React from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'
import Signup from './features/auth/components/Signup';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
     <SignupPage></SignupPage>
    </div>
  );
}

export default App;
