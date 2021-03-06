import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Streams from '../../api/streams/streams.js';
import App from '../App.jsx';

export default withTracker(() => {
  const dropsHandle = Meteor.subscribe('drops');
  const streamsHandle = Meteor.subscribe('streams');
  const streams = Streams.find({});
  const stream = streams.count() === 1 ? streams.fetch()[0] : null;
  const user = Meteor.user();

  if (user) {
    user.email = user.emails[0].address;
  }

  return {
    user,
    loading: !dropsHandle.ready() || !streamsHandle.ready(),
    connected: Meteor.status().connected,
    stream,
  };
})(App);
