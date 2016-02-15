import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-note/tests/helpers/start-app';

var application;

module('Acceptance | register', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /register', function(assert) {
  visit('/register');

  fillIn('#name','test@pragprog.com');
  click('#register');

  andThen(function() {
    assert.equal(find('#message').text().trim(),
      'A new user with the name "test@pragprog.com" was added!');
    assert.equal(currentURL(), '/register');
  });
});
