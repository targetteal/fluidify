import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import Message from '../components/Message.jsx';
import BaseComponent from '../components/BaseComponent.jsx';

class FieldGroup extends BaseComponent {
  render() {
    const {
      id, label, help, ...props
    } = this.props;
    const { error } = this.state;
    const validationState = error ? 'error' : null;

    return (
      <FormGroup validationState={validationState} controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}

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
    const confirm = this.confirmPassword.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageJoin.emailRequired');
    }
    if (!password) {
      errors.password = i18n.__('pages.authPageJoin.passwordRequired');
    }
    if (confirm !== password) {
      errors.confirm = i18n.__('pages.authPageJoin.passwordConfirm');
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
      this.context.router.push('/');
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper-auth">
        <h1>Sign Up</h1>
        <br />
        { errors.auth ? <Message message={errors.auth} /> : '' }
        <form onSubmit={this.onSubmit}>
          <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
            ref={(value) => { this.email = value; }}
            error={errors.email}
          />
          <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
            ref={(value) => { this.password = value; }}
            error={errors.password}
          />
          <FieldGroup
            id="formControlsConfirmPassword"
            label="Repeat Password"
            type="password"
            ref={(value) => { this.confirmPassword = value; }}
            error={errors.confirmPassword}
          />
          <Button type="submit">Submit</Button>
        </form>
        <br />
        <Link to="/signin" className="link-auth-alt">
          {i18n.__('pages.authPageJoin.haveAccountSignIn')}
        </Link>

        {/* <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input
              type="email"
              name="email"
              ref={(c) => { this.email = c; }}
              placeholder={i18n.__('pages.authPageJoin.yourEmail')}
            />
            <span
              className="icon-email"
              title={i18n.__('pages.authPageJoin.yourEmail')}
            />
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input
              type="password"
              name="password"
              ref={(c) => { this.password = c; }}
              placeholder={i18n.__('pages.authPageJoin.password')}
            />
            <span
              className="icon-lock"
              title={i18n.__('pages.authPageJoin.password')}
            />
          </div>
          <div className={`input-symbol ${errorClass('confirm')}`}>
            <input
              type="password"
              name="confirm"
              ref={(c) => { this.confirm = c; }}
              placeholder={i18n.__('pages.authPageJoin.confirmPassword')}
            />
            <span
              className="icon-lock"
              title={i18n.__('pages.authPageJoin.confirmPassword')}
            />
          </div>
          <button type="submit" className="btn-primary">
            {i18n.__('pages.authPageJoin.joinNow')}
          </button>
        </form> */}
      </div>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object,
};
