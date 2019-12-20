import React, {Component} from 'react';
import MyInput from './MyInput';
import Button from 'react-bootstrap/Button';

class SwordFight extends Component{
    constructor(props){
        super(props);
        this.state = {
            masterLevel1:0,
            masterLevel2:0,
            masterLevel3:0,
            masterPoints1:0,
            masterPoints2:0,
            masterPoints3:0,
            rivalMasterLevel:0,
            rivalMasterTargetLevel:0,
            rivalMasterGreaterAmbition:false
        }
        this.handleMasterLevel1Change = this.handleMasterLevel1Change.bind(this);
        this.handleMasterLevel2Change = this.handleMasterLevel2Change.bind(this);
        this.handleMasterLevel3Change = this.handleMasterLevel3Change.bind(this);
        this.handleMasterPoints1Change = this.handleMasterPoints1Change.bind(this);
        this.handleMasterPoints2Change = this.handleMasterPoints2Change.bind(this);
        this.handleMasterPoints3Change = this.handleMasterPoints3Change.bind(this);
        
        this.handleRivalMasterLevelChange = this.handleRivalMasterLevelChange.bind(this);
        this.handleRivalMasterTargetLevelChange = this.handleRivalMasterTargetLevelChange.bind(this);
        this.handleRivalMasterGreaterAmbitionChange = this.handleRivalMasterGreaterAmbitionChange.bind(this);
    }

    handleMasterLevel1Change(event){
        let masterLevel1 = parseInt(event.target.value);
        this.setState({
            masterLevel1
        })
    }
    handleMasterLevel2Change(event){
        let masterLevel2 = parseInt(event.target.value);
        this.setState({
            masterLevel2
        })
    }
    handleMasterLevel3Change(event){
        let masterLevel3 = parseInt(event.target.value);
        this.setState({
            masterLevel3
        })
    }

    handleMasterPoints1Change(event){
        let masterPoints1 = parseInt(event.target.value);
        this.setState({
            masterPoints1
        })
    }
    handleMasterPoints2Change(event){
        let masterPoints2 = parseInt(event.target.value);
        this.setState({
            masterPoints2
        })
    }
    handleMasterPoints3Change(event){
        let masterPoints3 = parseInt(event.target.value);
        this.setState({
            masterPoints3
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
        let rivalMasterGreaterAmbition = parseInt(event.target.value);
        this.setState({
            rivalMasterGreaterAmbition
        })
    }
    render(){
        return (
        <div id="sword-fight-calculator">
            <h1>Rival Leveling Time</h1>
            <h2>Master 1</h2>
            <MyInput id="master_level_1" type="text" label="Level: " value={this.state.masterLevel1} onChange={this.handleMasterLevel1Change} />
            <MyInput id="master_points_1" type="text" label="Unspent Points: " value={this.state.masterPoints1} onChange={this.handleMasterPoints1Change} />

            <h2>Master 2</h2>
            <MyInput id="master_level_2" type="text" label="Level: " value={this.state.masterLevel2} onChange={this.handleMasterLevel2Change} />
            <MyInput id="master_points_2" type="text" label="Unspent Points: " value={this.state.masterPoints2} onChange={this.handleMasterPoints2Change} />

            <h2>Master 3</h2>
            <MyInput id="master_level_3" type="text" label="Level: " value={this.state.masterLevel3} onChange={this.handleMasterLevel3Change} />
            <MyInput id="master_points_3" type="text" label="Unspent Points: " value={this.state.masterPoints3} onChange={this.handleMasterPoints3Change} />

            <h2>Rival Master.</h2>
            <MyInput id="rival_master_level" type="text" label="Level: " value={this.state.rivalMasterLevel} onChange={this.handleRivalMasterLevelChange} />
            <MyInput id="rival_master_target_level" type="text" label="Target Level: " value={this.state.rivalMasterTargetLevel} onChange={this.handleRivalMasterTargetLevelChange} />
            <MyInput id="rival_master_greater_ambition" type="checkbox" label="Co-Founder with Greater Ambition: " value={this.state.rivalMasterGreaterAmbition} onChange={this.handleRivalMasterGreaterAmbitionChange} />

            <br/>
            <Button>Calculate</Button><Button variant="secondary">Set Timer</Button>
        </div>
        );
    }
}

export default SwordFight