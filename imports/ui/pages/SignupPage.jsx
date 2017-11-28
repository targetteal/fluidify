import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { Button } from 'react-bootstrap';

import Message from '../components/Message.jsx';
import BaseComponent from '../components/BaseComponent.jsx';
import FieldGroup from '../components/FieldGroup.jsx';

export default class SignupPage extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = Object.assign(this.state, { errors: {} });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageJoin.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.authPageJoin.passwordRequired');
    }
    if (!confirmPassword) {
      errors.confirmPassword = i18n.__('pages.authPageJoin.passwordConfirm');
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = i18n.__('pages.authPageJoin.passwordsDontMatch');
    }

    this.setState({ errors });

    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        this.setState({
          errors: { auth: err.reason },
        });
      }
      this.context.router.history.push('/');
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
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
            label="Password"
            type="password"
            name="password"
            inputRef={(ref) => { this.password = ref; }}
            error={errors.password}
          />
          <FieldGroup
            id="formControlsConfirmPassword"
            label="Repeat Password"
            type="password"
            name="confirmPassword"
            inputRef={(ref) => { this.confirmPassword = ref; }}
            error={errors.confirmPassword}
          />
          <Button type="submit">Submit</Button>
        </form>
        <br />
        <Link to="/signin" className="link-auth-alt">
          {i18n.__('pages.authPageJoin.haveAccountSignIn')}
        </Link>
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};
