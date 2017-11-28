import React from 'react';
import PropTypes from 'prop-types';

import HTree from '../components/HTree.jsx';

export default function HTreePage(props) {
  const drop = props.stream ? props.stream.drop() : null;
  return (
    <div>
      <h1>Tree</h1>
      <p>View your organizational structure (stream) as a tree. </p>
      {props.stream ? (<HTree key={drop._id} drop={drop} />) : ''}
    </div>
  );
}

HTreePage.defaultProps = {
  stream: {},
};

HTreePage.propTypes = {
  stream: PropTypes.object,
  user: PropTypes.object.isRequired,
};
