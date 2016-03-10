import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('notebook',  'Unit | Model | notebook', {
  needs: [
    'model:user',
    'model:note'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('it counts notes', function(assert) {
  var notebook = this.subject({ title: 'my notebook' });
  var note;
  var noteCount = Math.floor(Math.random() * (10 - 1) + 1);

  // Because the work we’re about to do runs asynchronously and has side
  // effects, the test runner requires that we do this work inside our own run
  // loop.
  Ember.run(() => {
    for(var i = 0; i < noteCount; i++) {
      note = this.store().createRecord('note');
      notebook.get('notes').addObject(note);
    }
  });

  assert.equal(notebook.noteCount(), noteCount);
});
