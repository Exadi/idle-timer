import React, { Fragment, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import DropDownMenuItem from "Components/DropDownMenuItem.js";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  pages: {
    display: "flex",
    flexGrow: 1
  },
  innerPages: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  drawer: {
    width: "50%"
  }
}));

export default function Navbar(props) {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [redirect, setRedirect] = useState("");

  return (
    <>
      {redirect ? <Redirect push to={redirect} /> : null}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => setDrawer(!drawer)}
          >
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
            <div className={classes.innerPages}>
              {props.pages.map((item, i) => {
                return (
                  <Fragment key={i}>
                    {item.subpages ? (
                      //item has subpages - make dropdown
                      <DropDownMenuItem page={item} />
                    ) : (
                      //item doesn't have subpages - just show the link
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to={item.link}
                      >
                        {item.title}
                      </Button>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
          {props.buttons.map(item => item)}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        className={classes.drawer}
      >
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {/*TODO change this to a List component*/}
          {props.pages.map((item, i) => {
            return (
              <TreeItem
                key={i}
                nodeId={i.toString()}
                color="inherit"
                href={item.link}
                label={item.title}
                onClick={() => {
                  if (item.subpages) return;
                  setRedirect(item.link);
                  setDrawer(false);
                }}
              >
                {item.subpages
                  ? item.subpages.map((subpage, j) => {
                      return (
                        <TreeItem
                          key={j}
                          nodeId={i.toString() + "_" + j.toString()}
                          color="inherit"
                          href={subpage.link}
                          label={subpage.title}
                          onClick={() => {
                            setRedirect(subpage.link);
                            setDrawer(false);
                          }}
                        />
                      );
                    })
                  : null}
              </TreeItem>
            );
          })}
        </TreeView>
      </Drawer>
    </>
  );
}
