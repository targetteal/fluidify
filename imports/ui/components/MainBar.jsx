import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

import BaseComponent from './BaseComponent.jsx';

// A replacement for the react-bootstrap NavItem that works with that renders a react-router Link
function NavItem(props) {
  // eslint-disable-next-line
  return (<li role="presentatiaon"><Link to={props.href}>{props.children}</Link></li>);
}

export default class MainBar extends BaseComponent {
  renderLoggedIn() {
    return (
      <Nav pullRight>
        <NavDropdown title={this.props.user.username} id="basic-nav-dropdown">
          <MenuItem href="/settings">Settings</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
  renderLoggedOut() {
    return (
      <Nav pullRight>
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/signup">Sign Up</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Fluidify</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="My Organization" id="basic-nav-dropdown">
              <MenuItem href="/tree/">View Structure as Tree</MenuItem>
              <MenuItem href="/holarchy/">View Structure as Holarchy</MenuItem>
              <MenuItem href="/waves/create/">Create Wave (modify structure)</MenuItem>
              <MenuItem href="/changes/">View last changes</MenuItem>
              <MenuItem href="/users/">Users</MenuItem>
              <MenuItem divider />
              <MenuItem href="/">Settings</MenuItem>
            </NavDropdown>
            <NavItem href="/public/">Public</NavItem>
          </Nav>
          {
            this.props.user
            ? this.renderLoggedIn()
            : this.renderLoggedOut()
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

MainBar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};
