import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../components/BaseComponent.jsx';

export default class CreateWavePage extends BaseComponent {
  render() {
    return (
      <h1>Create New Wave</h1>
    );
  }
}

CreateWavePage.defaultProps = {
  user: null,
};

CreateWavePage.propTypes = {
  user: PropTypes.object,
};
