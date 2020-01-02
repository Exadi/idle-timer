import React, { Component } from "react";
import CheckboxInput from "Components/FormControls/CheckboxInput";
import bell_01 from "assets/bell_01.ogg";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      isRunning: false,
      playSound: true,
      sendNotification: false
    };
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);

    this.handlePlaySoundChange = this.handlePlaySoundChange.bind(this);
    this.handleSendNotificationChange = this.handleSendNotificationChange.bind(
      this
    );

    this.audio = new Audio(this.props.sound);
  }

  handlePlaySoundChange(event) {
    let playSound = event.target.checked;
    this.setState({
      playSound
    });
  }

  handleSendNotificationChange(event) {
    let sendNotification = event.target.checked;
    this.setState({
      sendNotification
    });
  }

  tick() {
    let seconds = this.state.seconds - 1;

    if (seconds <= 0) {
      seconds = 0.0;
      clearInterval(this.intervalHandle);
      if (this.state.playSound) this.audio.play();
      if (this.state.sendNotification) this.props.notification();
    }
    this.setState({
      seconds
    });
  }
  start() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      isRunning: true
    });
  }

  restart() {
    clearInterval(this.intervalHandle);
    this.setState({
      seconds: this.props.seconds,
      isRunning: false
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    console.log("Timer update");
    if (this.props.seconds !== prevProps.seconds) {
      this.setState({
        seconds: this.props.seconds,
        isRunning: false
      });
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
    }
  }

  render() {
    if (!this.props.visible) return null;
    let hours = Math.floor(this.state.seconds / 3600);
    let minutes = Math.floor(this.state.seconds / 60) - hours * 60;
    let seconds = this.state.seconds - minutes * 60 - hours * 3600;
    return (
      <div
        className="box has-text-centered"
        visible={this.props.visible ? "true" : "false"}
      >
        <h2 className="subtitle is-3">Timer</h2>

        <div className="is-size-3">
          {hours}:{minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </div>
        <input
          type="button"
          className="button is-primary is-outlined"
          onClick={this.state.isRunning ? this.restart : this.start}
          value={this.state.isRunning ? "Reset" : "Start"}
        ></input>
        <div className="columns">
          <div className="column">
            <CheckboxInput
              label="Play Sound"
              checked={this.state.playSound}
              onChange={this.handlePlaySoundChange}
            />
          </div>
          <div className="column">
            <CheckboxInput
              label="Send Notification"
              checked={this.state.sendNotification}
              onChange={this.handleSendNotificationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
