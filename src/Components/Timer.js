import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import bell_01 from '../assets/bell_01.ogg'

class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            seconds: this.props.seconds,
            isRunning: false
        }
        this.tick = this.tick.bind(this);
        this.start = this.start.bind(this);

        this.audio = new Audio(this.props.sound)
    }

    tick(){
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds
        });

        if(seconds <= 0){
            seconds = 0.0;
            clearInterval(this.intervalHandle);
            this.audio.play();
        }
    }
    start(){
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({
            isRunning: true
        })
    }

    render(){
        let hours = Math.floor(this.state.seconds / 3600);
        let minutes = Math.floor(this.state.seconds / 60) - (hours * 60);
        let seconds = this.state.seconds - (minutes * 60) - (hours * 3600)
        return (<div className="timer">
            <Button variant="secondary" onClick={this.start} disabled={this.state.isRunning}>Set Timer</Button>{hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </div>)
    }
}

export default Timer;