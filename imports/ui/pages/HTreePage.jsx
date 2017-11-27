import React from 'react';
import PropTypes from 'prop-types';

import HTree from '../components/HTree.jsx';

export default function HTreePage(props) {
  const drop = props.stream ? props.stream.drop() : null;
  return props.stream ? (<HTree key={drop._id} drop={drop} />) : '';
}

HTreePage.defaultProps = {
  stream: {},
};

HTreePage.propTypes = {
  stream: PropTypes.object,
};
