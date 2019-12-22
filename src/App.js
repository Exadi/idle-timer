import React from 'react';
//import logo from './logo.svg';
import SwordFight from './Components/SwordFight'
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-headers">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>

      <section className="section">
        <div className="container is-fluid">
          <SwordFight/>
        </div>
      </section>
    </div>
  );
}

export default App;
