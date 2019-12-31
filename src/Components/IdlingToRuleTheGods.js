import React, {Component} from 'react';
import TextInput from "./FormControls/TextInput"
import CheckboxInput from './FormControls/CheckboxInput';
import Timer from './Timer/Timer';
import bell_01 from '../assets/bell_01.ogg'
import Notification from "react-web-notification"
import notifIcon from '../assets/notif.png';

class IdlingToRuleTheGods extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    render(){
        return (
        <div id="itrtg-calculator">
            <div className="has-text-centered">
                <h1 className="title is-1 has-text-centered">Idling to Rule the Gods</h1>
                <h2 className="title is-2 has-text-centered">Coming Soon</h2>

                <a target="_blank" rel="noopener noreferrer" href="https://www.kongregate.com/games/Ryu82/idling-to-become-god">Play ITRTG on Kongregate</a>
            </div>
        </div>
        );
    }
}

export default IdlingToRuleTheGods