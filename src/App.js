import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import MainComp from './components/MainComp';

function App() {
  return (
    <BrowserRouter>
      <MainComp/>
    </BrowserRouter>
  );
}

export default App;
