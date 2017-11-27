import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class WavesCollection extends Mongo.Collection {
  findOrganizations() {
    return this.find({ parent: null });
  }
}

const Waves = new WavesCollection('waves');

Waves.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isServer) {
  Meteor.publish('waves', () => (Waves.find({})));
}

Waves.schema = new SimpleSchema({
  tension: { type: String },
  parts: { type: Object },
  stream_id: { type: String }, // Stream id
  // Tbe drop being modified (if applicable)
  'parts.drop': { type: String, optional: true, defaultValue: null },
  // The type of wave part: creation, modification, destruction
  'parts.type': { type: String, optional: true },
  // The content of the wave part (drop); null if type is destruction
  'parts.content': { type: Object, optional: true },
});

Waves.attachSchema(Waves.schema);

Waves.helpers({
  hasChildren() {
    return Waves.find({ parent: this._id }).count() > 0;
  },
  children() {
    return Waves.find({ parent: this._id }).fetch();
  },
});

export default Waves;
