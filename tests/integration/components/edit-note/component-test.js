import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('edit-note', {
  // Specify the other units that are required for this test
  needs: ['component:markdown-to-html']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it saves', function(assert) {
  var component = this.subject();
  this.render();
  var saveTarget = {
    save: function() {
      assert.ok(true, 'saved the note');
    }
  };
  Ember.run(() => {
    component.set('note', saveTarget);
  });
  this.$().find('#save').click();
});

test('it closes', function(assert) {
  var component = this.subject();
  this.render();
  var closeTarget = {
    closeAction: function() {
      assert.ok(true, 'closed the window');
    }
  };
  component.set('close', 'closeAction');
  component.set('targetObject', closeTarget);
  this.$().find('#close').click();
});
