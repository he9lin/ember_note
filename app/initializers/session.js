import Ember from 'ember';

export function initialize(application) {
  var session = Ember.Object.extend();
  application.register('session:main', session);
  application.inject('adapter', 'session', 'session:main');
  application.inject('route', 'session', 'session:main');
}

export default {
  name: 'session',
  initialize
};
