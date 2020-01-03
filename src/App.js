import React from "react";
//import logo from './logo.svg';
import { Route, HashRouter } from "react-router-dom";
import Home from "./Home";
import RivalLevelingTime from "./Components/Calculators/SwordFight/RivalLevelingTime";
import Navbar from "./Components/Navbar";
import "./App.scss";
import IdlingToRuleTheGods from "./Components/Calculators/ITRTG/IdlingToRuleTheGods";

/* this array is used to create the Navbar and Routes */
let pages = [
  {
    title: "Sword Fight",
    //these top level links will just go to the first calculator because I don't know what to put on a landing page for each game...
    component: RivalLevelingTime,
    link: "/sword-fight/rival-leveling",
    subpages: [
      {
        title: "Rival Leveling Time",
        link: "/sword-fight/rival-leveling",
        component: RivalLevelingTime
      }
    ]
  },
  { title: "ITRTG", link: "/itrtg", component: IdlingToRuleTheGods }
];

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar pages={pages} />
        <section className="section">
          <div className="container">
            <Route exact path="/" component={Home} />
            {pages.map(page => {
              return (
                <>
                  <Route exact path={page.link} component={page.component} />
                  {page.subpages
                    ? page.subpages.map(subpage => {
                        if (subpage.link !== page.link) {
                          return (
                            <Route
                              exact
                              path={subpage.link}
                              component={subpage.component}
                            />
                          );
                        } else return null;
                      })
                    : ""}
                </>
              );
            })}
          </div>
        </section>
      </div>
    </HashRouter>
  );
}

export default App;
