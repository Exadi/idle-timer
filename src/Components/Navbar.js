import React, { Component } from "react";
import { NavLink } from "react-router-dom";

/* navbar mobile menu toggle (unmodified example implementation from https://bulma.io/documentation/components/navbar/) */
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setActiveTab(e) {
    console.log(e.target.id);
  }

  render() {
    return (
      <nav
        class="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="container">
          <div class="navbar-brand">
            <NavLink className="navbar-item" to="/">
              {this.props.logo ? (
                <img
                  src={this.props.logo}
                  width="112"
                  height="28"
                  alt="logo"
                ></img>
              ) : (
                "Home"
              )}
            </NavLink>

            <button
              //role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              {this.props.pages.map(item => {
                return (
                  /* empty root element to contain this without changing the html and misaligning the menu */
                  <>
                    {item.subpages ? (
                      /*item has subpages - make dropdown*/
                      <div className="navbar-item has-dropdown is-hoverable">
                        <NavLink className="navbar-link" to={item.link}>
                          {item.title}
                        </NavLink>
                        <div className="navbar-dropdown">
                          {item.subpages.map(subpage => {
                            return (
                              <NavLink
                                className="navbar-item"
                                to={subpage.link}
                              >
                                {subpage.title}
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* item doesn't have subpages - just show the link */
                      <NavLink className="navbar-item" to={item.link}>
                        {item.title}
                      </NavLink>
                    )}
                  </>
                );
              })}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">:)</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
