import React from 'react';
import PropTypes from 'prop-types';

import HTree from '../components/HTree.jsx';

export default function HTreePage(props) {
  const drop = props.stream ? props.stream.drop() : null;
  return (
    <div>
      { props.stream ?
        <div>
          <h1>{props.stream.name} - Tree</h1>
          <p>View your stream as a tree. </p>
          <HTree key={drop._id} drop={drop} />
        </div>
      : ''}
    </div>
  );
}

HTreePage.defaultProps = {
  stream: {},
};

HTreePage.propTypes = {
  stream: PropTypes.object,
};
