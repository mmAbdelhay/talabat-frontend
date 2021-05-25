import './App.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './views/login/loginForm/loginForm';

function App() {
  const [Url, setUrl] = useState('');

  useEffect(()=>{
    setUrl(process.env.REACT_APP_BASE_URL);
    console.log(Url);
  },[Url])

  return (
    <div className="container">
      <br/>
      <LoginForm />
    </div>
  );
}

export default App;
