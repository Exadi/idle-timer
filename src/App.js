import React, { Fragment } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home";
import RivalLevelingTime from "./Components/Calculators/SwordFight/RivalLevelingTime";
import Navbar from "./Components/Navbar";
import IdlingToRuleTheGods from "./Components/Calculators/ITRTG/IdlingToRuleTheGods";
import TimerList from "./Components/Timer/TimerList";
import CustomTimerAdder from "./Components/CustomTimerAdder";
import { addTimer, updateTimer } from "./actions";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "theme.js";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Modal from "@material-ui/core/Modal";
import Badge from "@material-ui/core/Badge";
import TimerIcon from "@material-ui/icons/Timer";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import "typeface-roboto";

/* this array is used to create the Navbar and Routes */
const pages = [
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
        sound,
        isRunning: false
      })
    );
  }
}

export function UpdateTimer(dispatch, timer) {
  dispatch(updateTimer(timer));
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: `absolute`,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function App() {
  const timers = useSelector(state => state.timers);
  const [timersOpen, setTimersOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  let countNotRunning = timers.filter(timer => !timer.isRunning).length;
  let buttons = [
    <IconButton
      key="timersButton"
      color="inherit"
      onClick={() => setTimersOpen(true)}
    >
      <Badge badgeContent={countNotRunning} color="secondary">
        <TimerIcon />
      </Badge>
    </IconButton>
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <div className="App">
            <Navbar pages={pages} buttons={buttons} />
            <Container style={{ paddingTop: "25px", paddingBottom: "25px" }}>
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
            </Container>

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={timersOpen}
              onClose={() => setTimersOpen(false)}
              keepMounted
            >
              <Fade in={timersOpen}>
                <Paper style={modalStyle}>
                  <h2 id="simple-modal-title">Timers</h2>
                  <p id="simple-modal-description">View timers.</p>
                  <TimerList></TimerList>
                </Paper>
              </Fade>
            </Modal>
          </div>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
