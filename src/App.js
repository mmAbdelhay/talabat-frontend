import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [Url, setUrl] = useState('');

  useEffect(()=>{
    setUrl(process.env.REACT_APP_BASE_URL);
    console.log(Url);
  },[Url])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h3>{Url}</h3>
      </header>
    </div>
  );
}

export default App;
