import React, { Component } from "react";
import bell_01 from "assets/bell_01.ogg";
import { connect } from "react-redux";
import { AddTimer } from "App";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { Typography, Link, Box } from "@material-ui/core";

const fullHeight = {
  height: "100%"
};

const centered = {
  textAlign: "center"
};

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
      greaterInspiringLeader: false
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
    const timerName = "Rival Leveling";
    let timerSeconds = Math.round(totalMinutes * 60);

    AddTimer(
      this.props.timers,
      this.props.dispatch,
      timerName,
      timerSeconds,
      bell_01
    );
  }

  render() {
    return (
      <Box id="sword-fight-calculator" className="slide-from-right">
        <Grid container spacing={3}>
          <Grid item xs={12} style={centered}>
            <Typography variant="h4">
              Sword Fight - Rival Leveling Time
            </Typography>
          </Grid>
          {this.state.masters.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper style={fullHeight}>
                <Typography variant="h5">Master {index + 1}</Typography>
                <TextField
                  id={"master_level_" + index}
                  label="Level"
                  value={item.level}
                  onChange={this.handleMasterLevelChange}
                />
                <TextField
                  id={"master_points_" + index}
                  label="Unspent Points"
                  value={item.unspentPoints}
                  onChange={this.handleMasterPointsChange}
                  helperText="Ignore if not using Inspiring Leader"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={fullHeight}>
              <Typography variant="h5">Rival Master</Typography>
              <TextField
                id="rival_master_level"
                label="Level: "
                value={this.state.rivalMasterLevel}
                onChange={this.handleRivalMasterLevelChange}
              />
              <TextField
                id="rival_master_target_level"
                label="Target Level: "
                value={this.state.rivalMasterTargetLevel}
                onChange={this.handleRivalMasterTargetLevelChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="rival_master_greater_ambition"
                    type="checkbox"
                    checked={this.state.rivalMasterGreaterAmbition}
                    onChange={this.handleRivalMasterGreaterAmbitionChange}
                  />
                }
                label={
                  <>
                    Co-Founder with{" "}
                    <span
                      className="tooltip"
                      data-tooltip="Unlocks upon completing 10 Co-Founder special trainings."
                    >
                      Greater Ambition
                    </span>
                  </>
                }
              ></FormControlLabel>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={fullHeight}>
              <Typography variant="h5">Inspiring Leader</Typography>
              <Typography variant="subtitle1">(Xander's 4th Skill)</Typography>
              <TextField
                id="inspiring_leader_level"
                label="Level: "
                value={this.state.inspiringLeaderLevel}
                onChange={this.handleInspiringLeaderLevelChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="inspiring_leader_greater"
                    checked={this.state.greaterInspiringLeader}
                    onChange={this.handleGreaterInspiringLeaderChange}
                  />
                }
                label={
                  <>
                    <Typography>Greater Inspiring Leader unlocked</Typography>
                  </>
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={12} style={centered}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.calculate}
            >
              Calculate
            </Button>
            <br />
            <br />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.kongregate.com/games/tovrick/sword-fight"
            >
              Play Sword Fight on Kongregate
            </Link>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    timers: state.timers
  };
};

export default connect(mapStateToProps)(RivalLevelingTime);
