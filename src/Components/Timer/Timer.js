import React, { Component } from "react";
import { removeTimer } from "actions";
import { connect } from "react-redux";
import notifIcon from "assets/notif.png";
import { UpdateTimer } from "App.js";

import { IconButton } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.seconds !== prevProps.seconds) {
      this.setState({
        seconds: this.props.seconds,
        isRunning: false
      });
      if (this.intervalHandle) {
        clearInterval(this.intervalHandle);
      }
    }

    if (this.state.isRunning !== prevState.isRunning) {
      /*if running status changes, the global store is updated so the timer badge can show the timers that aren't running.
      Does not update the seconds with state.seconds because that would alter the seconds prop and prevent resetting to the original time 
      (maybe original seconds value should be named differently to avoid confusion...)*/
      UpdateTimer(this.props.dispatch, {
        name: this.props.name,
        seconds: this.props.seconds,
        sound: this.props.sound,
        isRunning: this.state.isRunning
      });
    }
  }

  componentDidMount() {
    //if notifications are turned on by default, ask for permission when a timer is created
    //TODO it will make more sense to ask when they turn that setting on, so move this there
    if (this.state.sendNotification) {
      this.notifyMe();
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
        </div>
        <div className="timer-controls">
          <IconButton
            color="secondary"
            onClick={this.restart}
            aria-label="restart"
          >
            <SkipPreviousIcon />
          </IconButton>
          {this.state.isRunning ? (
            <IconButton color="primary" onClick={this.pause} aria-label="pause">
              <PauseIcon />
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={this.start} aria-label="start">
              <PlayArrowIcon />
            </IconButton>
          )}
        </div>
        <div className="timer-controls">
          {this.state.playSound ? (
            <IconButton
              color="primary"
              onClick={this.handlePlaySoundChange}
              aria-label="disable-sound"
            >
              <VolumeUpIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              onClick={this.handlePlaySoundChange}
              aria-label="enable-sound"
            >
              <VolumeOffIcon />
            </IconButton>
          )}

          {this.state.sendNotification ? (
            <IconButton
              color="primary"
              onClick={this.handleSendNotificationChange}
              aria-label="disable-notification"
            >
              <NotificationsIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              onClick={this.handleSendNotificationChange}
              aria-label="enable-notification"
            >
              <NotificationsOffIcon />
            </IconButton>
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
