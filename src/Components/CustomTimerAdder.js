import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bell_01 from "assets/bell_01.ogg";
import { AddTimer } from "../App";
import { TextField, Grid, Button, Typography } from "@material-ui/core";

function CustomTimerAdder() {
  const timers = useSelector(state => state.timers);
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();

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
          label="Hours: "
          value={hours}
          onChange={e => setHours(parseInt(e.target.value) || 0)}
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Minutes: "
          value={minutes}
          onChange={e => setMinutes(parseInt(e.target.value) || 0)}
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
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
