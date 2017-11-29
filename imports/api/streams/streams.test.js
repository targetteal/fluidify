/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import Streams from './streams.js';
import Drops from '../drops/drops.js';

if (Meteor.isServer) {
  describe('Streams', () => {
    describe('helpers', () => {
      let streamId;
      let dropId;

      beforeEach(() => {
        Streams.remove({});
        streamId = Streams.insert({
          name: 'Company',
          url: 'https://company.com',
        });
        dropId = Drops.insert({
          name: 'Circle',
          properties: {},
          type: Drops.TYPE_CIRCLE,
          streamId,
        });
      });

      describe('drop()', () => {
        it('should return the stream outmost drop', () => {
          const stream = Streams.findOne({ _id: streamId });
          assert.isOk(stream);
          const drop = stream.drop();
          assert.isOk(drop);
          assert.equal(drop._id, dropId);
        });
      });
    });
  });
}
