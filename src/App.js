import logo from './logo.svg';
import './App.css';
import "./firebase"
import { Route } from "react-router-dom"
import { Form } from './components/form';
import React from 'react';

function App() {
  
  return (
    <div className="App">
        <Route path="/" component={Form}/>
    </div>
  );
}

export default App;
