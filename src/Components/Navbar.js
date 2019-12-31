import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    setActiveTab(e){
        console.log(e.target.id)
    }

    render(){
        return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <NavLink className="navbar-item" to="/">
                    {this.props.logo ? <img src={this.props.logo} width="112" height="28"></img> : "Home"}
                </NavLink>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    {this.props.pages.map((item) => (
                        <NavLink className="navbar-item" to={item.link}>
                            {item.title}
                        </NavLink>
                    ))}
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    :)
                </div>
                </div>
            </div>
        </nav>
        );
    }
}

export default Navbar