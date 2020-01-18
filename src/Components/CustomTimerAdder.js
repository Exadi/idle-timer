import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import bell_01 from "assets/bell_01.ogg";
import { AddTimer } from "../App";
import { TextField, Grid, Button, Typography } from "@material-ui/core";

function checkFocusNext(input, previous, nextRef) {
  //if input is 2 digits, go to the next input, to help people enter numbers quicker but also allow them to go back and enter a 3 digit number if desired.

  //don't jump to the next element if they're backspacing
  if (input > previous) {
    if (input >= 10 && input <= 99) {
      nextRef.current.focus();
    }
  }
}

function CustomTimerAdder() {
  const timers = useSelector(state => state.timers);
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const hoursElement = useRef(null);
  const minutesElement = useRef(null);
  const secondsElement = useRef(null);

  const addButton = () => {
    let timerName = name;
    let timerSeconds = hours * 3600 + minutes * 60 + seconds;

    AddTimer(timers, dispatch, timerName, timerSeconds, bell_01);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h4">Custom Timer</Typography>
        <Typography>
          Here you can add timers for anything you want, as long as you already
          know how much time it will take.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name: "
          value={name}
          onChange={e => setName(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          inputRef={hoursElement}
          label="Hours: "
          value={hours}
          onChange={e => {
            console.log(e);
            let input = parseInt(e.target.value);
            let previous = hours;
            checkFocusNext(input, previous, minutesElement);
            setHours(input || 0);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          inputRef={minutesElement}
          label="Minutes: "
          value={minutes}
          onChange={e => {
            let input = parseInt(e.target.value);
            let previous = minutes;
            checkFocusNext(input, previous, secondsElement);
            setMinutes(input || 0);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          inputRef={secondsElement}
          label="Seconds: "
          value={seconds}
          onChange={e => setSeconds(parseInt(e.target.value) || 0)}
        ></TextField>
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={addButton}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default CustomTimerAdder;
