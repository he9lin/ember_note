import Ember from 'ember';

export function initialize(application) {
  var logger = Ember.Object.extend({
    log: function(message) {
      console.log(message);
    }
  });
  application.register('logger:main', logger);
  application.inject('route','logger','logger:main');
}

export default {
  name: 'logger',
  initialize
};
