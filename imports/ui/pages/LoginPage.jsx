import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import { Button } from 'react-bootstrap';

import Message from '../components/Message.jsx';
import BaseComponent from '../components/BaseComponent.jsx';
import FieldGroup from '../components/FieldGroup.jsx';

export default class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.email.value;
    const password = this.password.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.loginPage.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.loginPage.passwordRequired');
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { auth: err.reason },
        });
      } else {
        this.context.router.history.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <br />
        { errors.auth ? <Message message={errors.auth} /> : '' }
        <form onSubmit={this.onSubmit}>
          <FieldGroup
            id="formControlsEmail"
            type="email"
            name="email"
            label="Email address"
            placeholder="Enter email"
            inputRef={(ref) => { this.email = ref; }}
            error={errors.email}
          />

          <FieldGroup
            id="formControlsPassword"
            type="password"
            name="password"
            label="Password address"
            placeholder="Enter password"
            inputRef={(ref) => { this.password = ref; }}
            error={errors.password}
          />

          <Button type="submit">
            {i18n.__('pages.loginPage.loginButton')}
          </Button>
        </form>
        <br />
        <Link to="/signup" className="link-auth-alt">
          {i18n.__('pages.loginPage.needAccount')}
        </Link>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object,
};
