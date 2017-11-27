import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import Drops from '../../api/drops/drops.js';
import Streams from '../../api/streams/streams.js';

function createStartupData() {
  const TYPE_CIRCLE = 'circle';
  const TYPE_ROLE = 'role';
  const TYPE_SPECIAL_ROLE = 'special-role';

  const O2_CORE_ROLE_FACILITATOR = {
    name: 'Facilitator',
    type: TYPE_SPECIAL_ROLE,
    properties: {
      purpose: 'Healthy circle meetings aligned with the Game Book',
      artifacts: [],
      accountabilities: ['Facilitating circle meetings'],
    },
  };
  const O2_CORE_ROLE_SECRETARY = {
    name: 'Secretary',
    type: TYPE_SPECIAL_ROLE,
    properties: {
      purpose: 'Accurate record keeping of the circle structural records',
      accountabilities: [
        'Scheduling regular circle meetings',
        'Recording circle meeting outputs',
      ],
      artifacts: ['Circle structural records'],
    },
  };
  const O2_CORE_ROLE_EXTERNAL_LINK = {
    name: 'External Link',
    type: TYPE_SPECIAL_ROLE,
    properties: {
      purpose: 'The circle\'s purpose',
      accountabilities: [
        'Structuring the circle to express its purpose',
        'Assigning people to the circle’s roles; monitoring the fit; offering feedback to enhance fit; and re-assigning roles to other people when useful for enhancing fit',
        'Establishing priorities for the circle',
      ],
      artifacts: ['Role assignment within the circle'],
    },
  };
  const O2_CORE_ROLE_INTERNAL_LINK = {
    name: 'Internal Link',
    type: TYPE_SPECIAL_ROLE,
    properties: {
      purpose: 'The circle\'s purpose',
      accountabilities: [
        'Removing constraints within the outer organization that limit the circle',
        'Providing visibility on the health of the circle to the outer circle',
        'Seeking to understand tensions brought by the circle members, and processing those appropriate in the outer circle',
      ],
    },
  };

  const targetTealStream = {
    name: 'Target Teal',
    url: 'https://targetteal.com/',
  };

  const streamId = Streams.insert(targetTealStream);

  function addCoreRoles(circleId) {
    const coreRoles = [
      O2_CORE_ROLE_FACILITATOR,
      O2_CORE_ROLE_SECRETARY,
      O2_CORE_ROLE_EXTERNAL_LINK,
      O2_CORE_ROLE_INTERNAL_LINK,
    ];
    for (let i = 0; i < coreRoles.length; i += 1) {
      const copy = _.clone(coreRoles[i]);
      copy.parent = circleId;
      copy.streamId = streamId;
      Drops.insert(copy);
    }
  }

  const targetTealCircle = {
    name: 'Target Teal',
    createdAt: (new Date()).getTime(),
    type: TYPE_CIRCLE,
    properties: {
      purpose: 'Seeding evolutionary social systems',
    },
    parentId: null,
    streamId,
  };
  const targetTealCircleId = Drops.insert(targetTealCircle);
  addCoreRoles(targetTealCircleId);

  const contentProducerRole = {
    name: 'Content Producer',
    type: TYPE_ROLE,
    properties: {
      purpose: 'The best contents about the future of work',
      artifacts: [],
      accountabilities: [
        'Producing blog posts',
        'Creating podcasts',
        'Developing workshop materials',
      ],
    },
    parentId: targetTealCircleId,
    streamId,
  };

  Drops.insert(contentProducerRole);
  const multiAgentCircle = {
    name: 'Multi-Agent Workshops',
    type: TYPE_CIRCLE,
    properties: {
      purpose: 'Multi-Agent worksohps perfectly coordinated',
    },
    parentId: targetTealCircleId,
    streamId,
  };
  const multiAgentCircleId = Drops.insert(multiAgentCircle);
  addCoreRoles(multiAgentCircleId);
}

Meteor.startup(() => {
  if (Drops.find().count() === 0) {
    createStartupData();
  }
});
