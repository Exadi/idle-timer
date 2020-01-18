import React, { Component } from "react";
import "./Timer.scss";
import { removeTimer } from "actions";
import { connect } from "react-redux";
import notifIcon from "assets/notif.png";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
      isRunning: this.props.isRunning || false,
      playSound: true,
      sendNotification: this.props.notifications,
      hasFinished: false,
      endTime: new Date(Date.now())
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
    if (sendNotification) {
      this.notifyMe();
    }
    this.setState({
      sendNotification
    });
  }

  tick() {
    //check the difference between the endTime and now and set remaining seconds to that to keep it from falling behind
    let milliseconds = this.state.endTime - Date.now();
    let seconds = Math.round(milliseconds / 1000);

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
    /*FIXME Low Priority: because timer interval is 1 second, pausing and restarting before that does not progress the timer at all. 
    I doubt anyone would do that enough to make a significant difference. */
    //seconds must be converted to milliseconds to add to Date.now()
    let endTime = new Date(Date.now() + this.state.seconds * 1000);
    this.intervalHandle = setInterval(this.tick, 1000);

    this.setState({
      isRunning: true,
      hasFinished: false,
      endTime
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

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  notifyMe() {
    //from https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted") {
      //TODO maybe add an option later for testing notifications when permission has already been granted.
    }

    // Otherwise, we need to ask the user for permission
    else if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const options = {
            body: "This is what your notifications will look like.",
            icon: notifIcon,
            lang: "en",
            dir: "ltr"
          };
          new Notification("Hi there!", options);
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
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
          <br />
          {this.state.endTime.getHours()}:{this.state.endTime.getMinutes()}:
          {this.state.endTime.getSeconds() < 10
            ? "0" + this.state.endTime.getSeconds()
            : this.state.endTime.getSeconds()}
          <br />
          {this.state.endTime.getTime()}
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

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(Timer);
