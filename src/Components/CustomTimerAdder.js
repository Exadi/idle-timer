import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "Components/FormControls/TextInput";
import bell_01 from "assets/bell_01.ogg";
import { AddTimer } from "../App";

function CustomTimerAdder() {
  const timers = useSelector(state => state.timers);
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();

  const addButton = () => {
    console.log("TEST");
    let timerName = name;
    let timerSeconds = seconds;

    AddTimer(timers, dispatch, timerName, timerSeconds, bell_01);
  };

  return (
    <div>
      <h1 className="title is-1 has-text-centered">Custom Timer</h1>
      <p>
        Here you can add timers for anything you want, as long as you already
        know how much time it will take.
      </p>
      <TextInput
        label="Name: "
        value={name}
        onChange={e => setName(e.target.value)}
      ></TextInput>
      <TextInput
        label="Seconds: "
        value={seconds}
        onChange={e => setSeconds(parseInt(e.target.value) || 0)}
      ></TextInput>
      <div className="has-text-centered">
        <input
          type="button"
          className="button is-primary"
          onClick={addButton}
          value="Add"
        ></input>
      </div>
    </div>
  );
}

export default CustomTimerAdder;
