import logo from './logo.svg';
import './App.css';
import "./firebase"
import { Route } from "react-router-dom"
import { Form } from './components/form';
import React from 'react';
import { Results } from './components/results';

function App() {
  
  return (
    <div className="App">
        <Route exact path="/" component={Form}/>
        <Route exact path="/Results/:id" component={Results}/>
    </div>
  );
}

export default App;
