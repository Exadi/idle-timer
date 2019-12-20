import React, {Component} from 'react';
import MyInput from './MyInput';
import Button from 'react-bootstrap/Button';
import Timer from './Timer';
import bell_01 from '../assets/bell_01.ogg'

class Master {
    constructor(level, unspentPoints){
        this.level = level;
        this.unspentPoints = unspentPoints;
    }
}

class SwordFight extends Component{
    constructor(props){
        super(props);
        this.state = {
            masters: [
                new Master(0, 0),
                new Master(0, 0),
                new Master(0, 0)
            ],
            rivalMasterLevel:0,
            rivalMasterTargetLevel:0,
            rivalMasterGreaterAmbition:false,
            inspiringLeaderLevel:0,
            greaterInspiringLeader:false,
            timer:"Results should appear here"
        }
        this.handleMasterLevelChange = this.handleMasterLevelChange.bind(this);
        this.handleMasterPointsChange = this.handleMasterPointsChange.bind(this);
        
        this.handleRivalMasterLevelChange = this.handleRivalMasterLevelChange.bind(this);
        this.handleRivalMasterTargetLevelChange = this.handleRivalMasterTargetLevelChange.bind(this);
        this.handleRivalMasterGreaterAmbitionChange = this.handleRivalMasterGreaterAmbitionChange.bind(this);

        this.handleInspiringLeaderLevelChange = this.handleInspiringLeaderLevelChange.bind(this);
        this.handleGreaterInspiringLeaderChange = this.handleGreaterInspiringLeaderChange.bind(this);

        this.calculate = this.calculate.bind(this);
    }

    handleMasterLevelChange(event) {
        let index = event.target.id.split("_")[2];
        console.log(index, event)
        let newLevel = parseInt(event.target.value);
        let master = {...this.state.masters[index]};
        let list = [ ...this.state.masters ];
        master.level = newLevel;
        list[index] = master;
        this.setState({
            masters: list
        })
    };

    handleMasterPointsChange(event) {
        let index = event.target.id.split("_")[2];
        console.log(index, event)
        let newPoints = parseInt(event.target.value);
        let master = {...this.state.masters[index]};
        let list = [ ...this.state.masters ];
        master.unspentPoints = newPoints;
        list[index] = master;
        this.setState({
            masters: list
        })
    }

    handleRivalMasterLevelChange(event){
        let rivalMasterLevel = parseInt(event.target.value);
        this.setState({
            rivalMasterLevel
        })
    }

    handleRivalMasterTargetLevelChange(event){
        let rivalMasterTargetLevel = parseInt(event.target.value);
        this.setState({
            rivalMasterTargetLevel
        })
    }

    handleRivalMasterGreaterAmbitionChange(event){
        let rivalMasterGreaterAmbition = event.target.checked;
        this.setState({
            rivalMasterGreaterAmbition
        })
    }

    handleInspiringLeaderLevelChange(event){
        let inspiringLeaderLevel = parseInt(event.target.value);
        this.setState({
            inspiringLeaderLevel
        })
    }
    handleGreaterInspiringLeaderChange(event){
        let greaterInspiringLeader =event.target.checked;
        this.setState({
            greaterInspiringLeader
        })
    }

    capUnspent(unspentPoints){
        let cap = this.state.greaterInspiringLeader ? this.state.inspiringLeaderLevel * 30 : this.state.inspiringLeaderLevel * 20;
        let capped = Math.min(unspentPoints, cap);
        if(capped < unspentPoints) console.log("Capped " + unspentPoints + " unspent points at " + capped);
        return Math.min(unspentPoints, cap);
    }
    calculate(){
        let result = "";
        let rivalLevel = this.state.rivalMasterLevel;
        let rivalTargetLevel = this.state.rivalMasterTargetLevel;
        let greaterAmbition = this.state.rivalMasterGreaterAmbition;

        //adjust master levels to account for greater ambition and create an array of the values
        let effectiveLevels = this.state.masters.map((item) => (greaterAmbition ? item.level + 100 : item.level))
        
        //if master levels are too low to reach the target, return an error message
        if (rivalTargetLevel > Math.max(...effectiveLevels)){
            result = "Rival will never reach target level!";
            this.setState({
                "timer": result
            });
            return;
        }
        let totalUnspentPoints = this.state.masters.map((item) => (this.capUnspent(item.unspentPoints))).reduce((a, b) => (a+b));
        console.log("Total unspent points: " + totalUnspentPoints);

        let totalMinutes = 0.0;
        for(let currentLevel = rivalLevel; currentLevel < rivalTargetLevel; currentLevel++)
        {
            console.log("Rival leveling from " + currentLevel + " to " + (currentLevel + 1) + ":");
            //create a new array of differences between rival level and master effective level, then add them together
            let totalDifference = effectiveLevels.map((item) => (Math.max(item - currentLevel))).reduce((a, b) => (a + b));
            console.log("Total level difference: " + totalDifference);
            console.log("Base exp/min: " + totalDifference);
            let inspiringLeaderMultiplier = (totalUnspentPoints + 100)/100;
            let expPerMin = totalDifference * inspiringLeaderMultiplier;
            console.log("Inspired exp/min: " + expPerMin);
            let expForLevel = (currentLevel + 1) * 10 - 1;
            let minutes = expForLevel / expPerMin;
            totalMinutes += minutes;
            console.log("It will take " + minutes + " minutes to gain the " + expForLevel + " exp for this level.");
        }

        console.log("The total time is " + totalMinutes);
        result = <Timer seconds={Math.round(totalMinutes * 60)} sound={bell_01} />
        this.setState({
            "timer": result
        })
    }

    render(){
        return (
        <div id="sword-fight-calculator">
            <h1>Rival Leveling Time</h1>

            {this.state.masters.map((item, index) => (
                <div key={index}>
                <h2>Master {index+1}</h2>
                <MyInput id={"master_level_" + index} type="text" label="Level: " value={item.level} onChange={this.handleMasterLevelChange} />
                <MyInput id={"master_points_" + index} type="text" label="Unspent Points: " value={item.unspentPoints} onChange={this.handleMasterPointsChange} />
                </div>
            ))}

            <h2>Rival Master</h2>
            <MyInput id="rival_master_level" type="text" label="Level: " value={this.state.rivalMasterLevel} onChange={this.handleRivalMasterLevelChange} />
            <MyInput id="rival_master_target_level" type="text" label="Target Level: " value={this.state.rivalMasterTargetLevel} onChange={this.handleRivalMasterTargetLevelChange} />
            <MyInput id="rival_master_greater_ambition" type="checkbox" label="Co-Founder with Greater Ambition: " checked={this.state.rivalMasterGreaterAmbition} onChange={this.handleRivalMasterGreaterAmbitionChange} />
            <br/>
            <h2>Inspiring Leader</h2>
            <MyInput id="rival_master_level" type="text" label="Level: " value={this.state.inspiringLeaderLevel} onChange={this.handleInspiringLeaderLevelChange} />
            <MyInput id="rival_master_level" type="checkbox" label="Greater: " checked={this.state.greaterInspiringLeader} onChange={this.handleGreaterInspiringLeaderChange} />

            <br/>
            <Button onClick={this.calculate}>Calculate</Button>
            <br/>
            
            {this.state.timer}
            <br/>
            <a href="https://www.kongregate.com/games/tovrick/sword-fight">Play Sword Fight on Kongregate</a>
        </div>
        );
    }
}

export default SwordFight