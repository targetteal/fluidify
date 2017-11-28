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
          const circle = Drops.findOne({ _id: circleId });
          assert.isOk(circle);
          assert.isTrue(circle.hasChildren());
        });

        it('should return false if there are no children', () => {
          const role = Drops.findOne({ _id: roleId });
          assert.isOk(role);
          assert.isFalse(role.hasChildren());
        });
      });

      describe('children()', () => {
        it('should return the children of a given drop', () => {
          const circle = Drops.findOne({ _id: circleId });
          const children = circle.children();
          assert.isArray(children);
          assert.equal(children[0]._id, roleId);
        });
      });
    });
  });
}
