import React, { Fragment } from "react";
//import logo from './logo.svg';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home";
import RivalLevelingTime from "./Components/Calculators/SwordFight/RivalLevelingTime";
import Navbar from "./Components/Navbar";
import "./App.scss";
import IdlingToRuleTheGods from "./Components/Calculators/ITRTG/IdlingToRuleTheGods";
import TimerList from "./Components/Timer/TimerList";
import CustomTimerAdder from "./Components/CustomTimerAdder";
import { addTimer } from "./actions";

/* this array is used to create the Navbar and Routes */
let pages = [
  {
    title: "Sword Fight",
    //these top level links will just go to the first calculator because I don't know what to put on a landing page for each game...
    link: "/sword-fight/rival-leveling",
    component: RivalLevelingTime,
    subpages: [
      {
        title: "Rival Leveling Time",
        link: "/sword-fight/rival-leveling",
        component: RivalLevelingTime
      }
    ]
  },
  { title: "ITRTG", link: "/itrtg", component: IdlingToRuleTheGods },
  { title: "Custom Timer", link: "/custom", component: CustomTimerAdder }
];

export function AddTimer(timers, dispatch, name, seconds, sound) {
  if (timers.find(item => item.name === name)) {
    //TODO ask to overwrite timer... or just do it without asking
    alert("This timer already exists!");
  } else {
    dispatch(
      addTimer({
        name,
        seconds,
        sound
      })
    );
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar pages={pages} />
        <section className="section main-section">
          <div className="container">
            <Route exact path="/" component={Home} />
            {pages.map((page, i) => {
              return (
                <Fragment key={i}>
                  <Route exact path={page.link} component={page.component} />
                  {page.subpages
                    ? page.subpages.map((subpage, i) => {
                        if (subpage.link !== page.link) {
                          return (
                            <Route
                              key={i}
                              exact
                              path={subpage.link}
                              component={subpage.component}
                            />
                          );
                        } else return null;
                      })
                    : ""}
                </Fragment>
              );
            })}
          </div>
        </section>
        <div className="timers">
          <TimerList></TimerList>
        </div>
      </div>
    </Router>
  );
}

export default App;
