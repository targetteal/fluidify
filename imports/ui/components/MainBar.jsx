import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';

import BaseComponent from './BaseComponent.jsx';

// A replacement for the react-bootstrap NavItem that works with that renders a react-router Link
function NavItem(props) {
  // eslint-disable-next-line
  return (<li role="presentation"><Link to={props.href}>{props.children}</Link></li>);
}

export default class MainBar extends BaseComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout();
    this.props.history.push('/');
  }

  renderLoggedIn() {
    return (
      <Nav pullRight>
        <NavDropdown title={this.props.user.email} id="basic-nav-dropdown">
          <NavItem href="/settings/">Settings</NavItem>
          <MenuItem divider />
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
  renderLoggedOut() {
    return (
      <Nav pullRight>
        <NavItem href="/login/">Login</NavItem>
        <NavItem href="/signup/">Sign Up</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><img src="/images/logo-128.png" alt="Logo" />Fluidify</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="My Organization" id="basic-nav-dropdown">
              <NavItem href="/tree/">View Structure as Tree</NavItem>
              <NavItem href="/holarchy/">View Structure as Holarchy</NavItem>
              <NavItem href="/waves/create/">Create Wave (modify structure)</NavItem>
              <NavItem href="/changes/">View last changes</NavItem>
              <NavItem href="/users/">Users</NavItem>
              <MenuItem divider />
              <NavItem href="/">Settings</NavItem>
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
