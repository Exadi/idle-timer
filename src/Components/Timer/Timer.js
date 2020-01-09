import React, { Component } from "react";
import "./Timer.scss";
import { removeTimer } from "actions";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      isRunning: this.props.isRunning || false,
      playSound: true,
      sendNotification: false,
      hasFinished: false
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
    let playSound = !this.state.playSound;
    this.setState({
      playSound
    });
  }

  handleSendNotificationChange(event) {
    let sendNotification = !this.state.sendNotification;
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
      this.setState({ hasFinished: true });
    } else {
      this.setState({
        seconds
      });
    }
  }
  start() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      isRunning: true,
      hasFinished: false
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
          {this.state.hasFinished ? (
            <span
              className="icon has-text-success tooltip"
              data-tooltip="This timer has finished."
            >
              <i className="fas fa-check"></i>
            </span>
          ) : null}
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
          <button className="button has-text-danger" onClick={this.restart}>
            <i className="fas fa-fast-backward"></i>
          </button>
          {this.state.isRunning ? (
            <button className="button has-text-warning" onClick={this.pause}>
              <i className="fas fa-pause"></i>
            </button>
          ) : (
            <button className="button has-text-primary" onClick={this.start}>
              <i className="fas fa-play"></i>
            </button>
          )}
        </div>
        <div className="timer-controls">
          {this.state.playSound ? (
            <button
              className="button has-text-primary"
              onClick={this.handlePlaySoundChange}
            >
              <i className="fas fa-volume-up"></i>
            </button>
          ) : (
            <button
              className="button has-text-primary"
              onClick={this.handlePlaySoundChange}
            >
              <i className="fas fa-volume-mute"></i>
            </button>
          )}

          {this.state.sendNotification ? (
            <button
              className="button has-text-primary"
              onClick={this.handleSendNotificationChange}
            >
              <i className="fas fa-bell"></i>
            </button>
          ) : (
            <button
              className="button has-text-primary"
              onClick={this.handleSendNotificationChange}
            >
              <i className="fas fa-bell-slash"></i>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(Timer);
