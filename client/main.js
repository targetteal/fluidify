/* global document */

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import AppContainer from '../imports/ui/containers/AppContainer.jsx';


Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'));
});
