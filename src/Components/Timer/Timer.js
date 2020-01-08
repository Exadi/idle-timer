import React, { Component } from "react";
import CheckboxInput from "Components/FormControls/CheckboxInput";
import "./Timer.scss";
import bell_01 from "assets/bell_01.ogg";
import { removeTimer } from "actions";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      isRunning: this.props.isRunning || false,
      playSound: true,
      sendNotification: false
    };
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.pause = this.pause.bind(this);

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
      this.restart();
    } else {
      this.setState({
        seconds
      });
    }
  }
  start() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      isRunning: true
    });
  }
  pause() {
    clearInterval(this.intervalHandle);
    this.setState({
      isRunning: false
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
    let hours = Math.floor(this.state.seconds / 3600);
    let minutes = Math.floor(this.state.seconds / 60) - hours * 60;
    let seconds = this.state.seconds - minutes * 60 - hours * 3600;
    return (
      <div className={this.props.visible ? "timer" : "timer hidden"}>
        <h2 className="subtitle is-3">
          {this.props.name}
          <span
            className="icon has-text-danger"
            onClick={() => this.props.dispatch(removeTimer(this.props.name))}
          >
            <i className="fas fa-times"></i>
          </span>
        </h2>

        <div className="is-size-4">
          {hours}:{minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </div>
        <div className="timer-controls">
          <button className="icon has-text-danger" onClick={this.restart}>
            <i className="fas fa-fast-backward"></i>
          </button>
          {this.state.isRunning ? (
            <button className="icon has-text-warning" onClick={this.pause}>
              <i className="fas fa-pause"></i>
            </button>
          ) : (
            <button className="icon has-text-primary" onClick={this.start}>
              <i className="fas fa-play"></i>
            </button>
          )}
        </div>

        <div className="columns">
          <div className="column">
            <CheckboxInput
              label="Sound"
              checked={this.state.playSound}
              onChange={this.handlePlaySoundChange}
            />
          </div>
          <div className="column">
            <CheckboxInput
              label="Notification"
              checked={this.state.sendNotification}
              onChange={this.handleSendNotificationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Timer);
