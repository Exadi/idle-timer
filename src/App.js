import React from 'react';
//import logo from './logo.svg';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from './Home'
import SwordFight from './Components/SwordFight'
import Navbar from './Components/Navbar'
import Timer from './Components/Timer/Timer'
import './App.scss';
import IdlingToRuleTheGods from './Components/IdlingToRuleTheGods';

let selectedPage = <SwordFight/>
let pages = [
  {title:"Sword Fight", link: "/sword-fight", component: SwordFight},
  {title:"ITRTG", link: "/itrtg", component: IdlingToRuleTheGods}
]

function selectPage(index){
  selectedPage = pages[index].content
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar pages={pages} />
        <section className="section">
          <div className="container is-fluid">
            
          <Route exact path="/" component={Home}/>
            {pages.map((item) => (
              <Route path={item.link} component={item.component}/>
            ))}
          </div>
        </section>
      </div>
    </HashRouter>
    
  );
}

export default App;
