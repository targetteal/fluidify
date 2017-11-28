import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class DropsCollection extends Mongo.Collection {
}

const Drops = new DropsCollection('drops');

Drops.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isServer) {
  Meteor.publish('drops', () => (Drops.find({})));
}

Drops.schema = new SimpleSchema({
  streamId: { type: String },
  name: { type: String },
  properties: { type: Object },
  parentId: { type: String, optional: true, defaultValue: null },
  type: { type: String },
  'properties.purpose': { type: String, optional: true },
  'properties.accountabilities': { type: [String], optional: true },
  'properties.artifacts': { type: [String], optional: true },
});

Drops.attachSchema(Drops.schema);

Drops.helpers({
  hasChildren() {
    return Drops.find({ parentId: this._id }).count() > 0;
  },
  children() {
    return Drops.find({ parentId: this._id }).fetch();
  },
});

Drops.TYPE_CIRCLE = 'circle';
Drops.TYPE_ROLE = 'role';
Drops.TYPE_SPECIAL_ROLE = 'special-role';

export default Drops;
