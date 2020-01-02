import React, { Component } from "react";
import TextInput from "Components/FormControls/TextInput";
import CheckboxInput from "Components/FormControls/CheckboxInput";
import Timer from "Components/Timer/Timer";
import bell_01 from "assets/bell_01.ogg";
import Notification from "react-web-notification";
import notifIcon from "assets/notif.png";

class Master {
  constructor(level, unspentPoints) {
    this.level = level;
    this.unspentPoints = unspentPoints;
  }
}

class RivalLevelingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masters: [new Master(0, 0), new Master(0, 0), new Master(0, 0)],
      rivalMasterLevel: 0,
      rivalMasterTargetLevel: 0,
      rivalMasterGreaterAmbition: false,
      inspiringLeaderLevel: 0,
      greaterInspiringLeader: false,
      timerVisible: false,
      timerSeconds: 0,
      /*notification*/
      ignore: true,
      title: ""
    };
    this.handleMasterLevelChange = this.handleMasterLevelChange.bind(this);
    this.handleMasterPointsChange = this.handleMasterPointsChange.bind(this);

    this.handleRivalMasterLevelChange = this.handleRivalMasterLevelChange.bind(
      this
    );
    this.handleRivalMasterTargetLevelChange = this.handleRivalMasterTargetLevelChange.bind(
      this
    );
    this.handleRivalMasterGreaterAmbitionChange = this.handleRivalMasterGreaterAmbitionChange.bind(
      this
    );

    this.handleInspiringLeaderLevelChange = this.handleInspiringLeaderLevelChange.bind(
      this
    );
    this.handleGreaterInspiringLeaderChange = this.handleGreaterInspiringLeaderChange.bind(
      this
    );

    this.calculate = this.calculate.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  handleMasterLevelChange(event) {
    let index = event.target.id.split("_")[2];
    let newLevel = parseInt(event.target.value, 10) || 0;
    let master = { ...this.state.masters[index] };
    let list = [...this.state.masters];
    master.level = newLevel;
    list[index] = master;
    this.setState({
      masters: list
    });
  }

  handleMasterPointsChange(event) {
    let index = event.target.id.split("_")[2];
    let newPoints = parseInt(event.target.value) || 0;
    let master = { ...this.state.masters[index] };
    let list = [...this.state.masters];
    master.unspentPoints = newPoints;
    list[index] = master;
    this.setState({
      masters: list
    });
  }

  handleRivalMasterLevelChange(event) {
    let rivalMasterLevel = parseInt(event.target.value) || 0;
    this.setState({
      rivalMasterLevel
    });
  }

  handleRivalMasterTargetLevelChange(event) {
    let rivalMasterTargetLevel = parseInt(event.target.value) || 0;
    this.setState({
      rivalMasterTargetLevel
    });
  }

  handleRivalMasterGreaterAmbitionChange(event) {
    let rivalMasterGreaterAmbition = event.target.checked;
    this.setState({
      rivalMasterGreaterAmbition
    });
  }

  handleInspiringLeaderLevelChange(event) {
    let inspiringLeaderLevel = parseInt(event.target.value) || 0;
    this.setState({
      inspiringLeaderLevel
    });
  }
  handleGreaterInspiringLeaderChange(event) {
    let greaterInspiringLeader = event.target.checked;
    this.setState({
      greaterInspiringLeader
    });
  }

  capUnspent(unspentPoints) {
    let maxPointsPerInspiringLeaderLevel = this.state.greaterInspiringLeader
      ? 30
      : 20;
    let cap =
      this.state.inspiringLeaderLevel * maxPointsPerInspiringLeaderLevel;
    let capped = Math.min(unspentPoints, cap);
    if (capped < unspentPoints)
      console.log("Capped " + unspentPoints + " unspent points at " + capped);
    return capped;
  }
  calculate() {
    let rivalLevel = this.state.rivalMasterLevel;
    let rivalTargetLevel = this.state.rivalMasterTargetLevel;
    let greaterAmbition = this.state.rivalMasterGreaterAmbition;

    //adjust master levels to account for greater ambition and create an array of the values
    const greaterAmbitionBonus = 100;
    let effectiveLevels = this.state.masters.map(master =>
      greaterAmbition ? master.level + greaterAmbitionBonus : master.level
    );

    //if master levels are too low to reach the target, return an error message
    if (rivalTargetLevel > Math.max(...effectiveLevels)) {
      alert("Rival will never reach target level!");
      return;
    }
    let totalUnspentPoints = this.state.masters
      .map(master => this.capUnspent(master.unspentPoints))
      .reduce((a, b) => a + b);
    console.log("Total unspent points: " + totalUnspentPoints);

    let totalMinutes = 0.0;
    for (
      let currentLevel = rivalLevel;
      currentLevel < rivalTargetLevel;
      currentLevel++
    ) {
      console.log(
        "Rival leveling from " +
          currentLevel +
          " to " +
          (currentLevel + 1) +
          ":"
      );
      //create a new array of differences between rival level and master effective level, then add them together
      let totalDifference = effectiveLevels
        .map(item => Math.max(item - currentLevel))
        .reduce((a, b) => a + b);
      console.log("Total level difference: " + totalDifference);
      console.log("Base exp/min: " + totalDifference);
      let inspiringLeaderMultiplier = (totalUnspentPoints + 100) / 100;
      let expPerMin = totalDifference * inspiringLeaderMultiplier;
      console.log("Inspired exp/min: " + expPerMin);
      let expForLevel = (currentLevel + 1) * 10 - 1;
      let minutes = expForLevel / expPerMin;
      totalMinutes += minutes;
      console.log(
        "It will take " +
          minutes +
          " minutes to gain the " +
          expForLevel +
          " exp for this level."
      );
    }

    console.log("The total time is " + totalMinutes);
    let timerVisible = true;
    let timerSeconds = Math.round(totalMinutes * 60);
    this.setState({
      timerVisible,
      timerSeconds
    });
  }

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      ignore: true
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      ignore: true
    });
  }
  sendNotification() {
    if (this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = "Idle Timer";
    const body = "Rival Leveling Complete!";
    const tag = now;
    const icon = notifIcon;

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr"
    };
    this.setState({
      title: title,
      options: options
    });
  }

  render() {
    return (
      <div id="sword-fight-calculator" className="slide-from-right">
        <h1 className="title is-1 has-text-centered">
          Sword Fight - Rival Leveling Time
        </h1>
        <div className="tile is-ancestor">
          {this.state.masters.map((item, index) => (
            <div key={index} className="tile is-parent">
              <div className="tile is-child box">
                <h2 className="title is-3 has-text-centered">
                  Master {index + 1}
                </h2>
                <TextInput
                  type="number"
                  id={"master_level_" + index}
                  label="Level: "
                  value={item.level}
                  onChange={this.handleMasterLevelChange}
                />
                <TextInput
                  type="number"
                  id={"master_points_" + index}
                  label="Unspent Points: "
                  value={item.unspentPoints}
                  onChange={this.handleMasterPointsChange}
                  help="Ignore if not using Inspiring Leader"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <h2 className="title is-3 has-text-centered">Rival Master</h2>
              <TextInput
                type="number"
                id="rival_master_level"
                label="Level: "
                value={this.state.rivalMasterLevel}
                onChange={this.handleRivalMasterLevelChange}
              />
              <TextInput
                type="number"
                id="rival_master_target_level"
                label="Target Level: "
                value={this.state.rivalMasterTargetLevel}
                onChange={this.handleRivalMasterTargetLevelChange}
              />
              <CheckboxInput
                id="rival_master_greater_ambition"
                type="checkbox"
                label="Co-Founder with Greater Ambition"
                checked={this.state.rivalMasterGreaterAmbition}
                onChange={this.handleRivalMasterGreaterAmbitionChange}
              />
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <h2 className="title is-3 has-text-centered">Inspiring Leader</h2>
              <h6 className="subtitle is-6 has-text-centered">
                (Xander's 4th Skill)
              </h6>
              <TextInput
                type="number"
                id="inspiring_leader_level"
                label="Level: "
                value={this.state.inspiringLeaderLevel}
                onChange={this.handleInspiringLeaderLevelChange}
              />
              <CheckboxInput
                id="inspiring_leader_greater"
                label="Greater Inspiring Leader unlocked"
                checked={this.state.greaterInspiringLeader}
                onChange={this.handleGreaterInspiringLeaderChange}
              />
            </div>
          </div>
        </div>
        <div className="has-text-centered">
          <input
            type="button"
            className="button is-primary"
            onClick={this.calculate}
            value="Calculate"
          ></input>
          <Notification
            ignore={this.state.ignore && this.state.title !== ""}
            notSupported={this.handleNotSupported.bind(this)}
            onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={this.handlePermissionDenied.bind(this)}
            timeout={5000}
            title={this.state.title}
            options={this.state.options}
            swRegistration={this.props.swRegistration}
          />
          <br />
          <Timer
            visible={this.state.timerVisible}
            seconds={this.state.timerSeconds}
            sound={bell_01}
            notification={this.sendNotification}
          />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.kongregate.com/games/tovrick/sword-fight"
          >
            Play Sword Fight on Kongregate
          </a>
        </div>
      </div>
    );
  }
}

export default RivalLevelingTime;
