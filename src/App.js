import React from 'react';
//import logo from './logo.svg';
import SwordFight from './Components/SwordFight'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-headers">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
          <SwordFight/>
    </div>
  );
}

export default App;
