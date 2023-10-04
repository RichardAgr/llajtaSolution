import React from 'react';
import './App.css';


import Header from './components/UbicacionImagen/ubicacionImagen'
import App2 from './components/Platilla/plantilla'
import FooterApp from './components/Footer/Footer'
import RegistroPlatillo from './views/RegistroPlatillo';

function App() {
  return (
    <div className="App">
      <Header/>
      <App2/>
      <FooterApp/>
    </div>
  );
}

export default App;
