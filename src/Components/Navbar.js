import React, { Component, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import TimerIcon from "@material-ui/icons/Timer";
import DropDownMenuItem from "Components/DropDownMenuItem.js";

//TODO replace horizontal navigation with burger menu on mobile
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  pages: {
    display: "flex",
    flexGrow: 1
  }
}));

export default function Navbar(props) {
  const classes = useStyles();
  const timers = useSelector(state => state.timers);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button color="inherit" component={RouterLink} to="/">
          {props.logo ? (
            <img src={props.logo} width="112" height="28" alt="logo"></img>
          ) : (
            "Home"
          )}
        </Button>
        <div className={classes.pages}>
          {props.pages.map((item, i) => {
            return (
              <Fragment key={i}>
                {item.subpages ? (
                  //item has subpages - make dropdown
                  <DropDownMenuItem page={item} />
                ) : (
                  //item doesn't have subpages - just show the link
                  <Button color="inherit" component={RouterLink} to={item.link}>
                    {item.title}
                  </Button>
                )}
              </Fragment>
            );
          })}
        </div>
        <IconButton color="inherit">
          <Badge badgeContent={timers.length} color="secondary">
            <TimerIcon />
            {/*TODO make this open timers (modal?)*/}
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
