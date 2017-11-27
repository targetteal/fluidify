import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

export default class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Create New Wave </h2>
      </div>
    );
  }
}
