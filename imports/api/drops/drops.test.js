/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import Drops from './drops.js';

if (Meteor.isServer) {
  describe('Drops', () => {
    describe('helpers', () => {
      const streamId = Random.id();
      let circleId;
      let roleId;

      beforeEach(() => {
        Drops.remove({});
        circleId = Drops.insert({
          name: 'Circle',
          properties: {},
          type: Drops.TYPE_CIRCLE,
          streamId,
          parentId: null,
        });
        roleId = Drops.insert({
          name: 'Role',
          properties: {},
          type: Drops.TYPE_ROLE,
          streamId,
          parentId: circleId,
        });
      });

      describe('hasChildren()', () => {
        it('should return true if there are children', () => {
          const circle = Drops.find({ _id: circleId }).fetch()[0];
          assert.isOk(circle);
          assert.isTrue(circle.hasChildren());
        });

        it('should return false if there are no children', () => {
          const role = Drops.find({ _id: roleId }).fetch()[0];
          assert.isOk(role);
          assert.isFalse(role.hasChildren());
        });
      });
    });
  });
}
