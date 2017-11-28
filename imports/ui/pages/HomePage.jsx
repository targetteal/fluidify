import React from 'react';
import PropTypes from 'prop-types';

export default function HomePage(props) {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

HomePage.defaultProps = {
  user: null,
};

HomePage.propTypes = {
  user: PropTypes.object,
};
