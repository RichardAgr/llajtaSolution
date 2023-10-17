import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/MenuNavegacion/header'
import App2 from './components/Plantilla/plantilla'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <App2 />
        <Footer />
      </div>
    </Router>
  );
}

export default App;