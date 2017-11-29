import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Drops from '../drops/drops.js';

class StreamsCollection extends Mongo.Collection {
}

const Streams = new StreamsCollection('streams');

Streams.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isServer) {
  Meteor.publish('streams', () => (Streams.find({})));
}

Streams.schema = new SimpleSchema({
  name: { type: String },
  url: { type: String },
});

Streams.attachSchema(Streams.schema);

Streams.helpers({
  drop() {
    return Drops.findOne({ parentId: null, streamId: this._id });
  },
});

export default Streams;
