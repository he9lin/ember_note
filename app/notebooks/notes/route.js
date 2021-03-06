import Ember from 'ember';
import isValidLength from 'ember-note/utils/is-valid-length';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('note', {notebook:params.notebook_id});
  },
  actions: {
    addNote: function() {
      var title = this.controller.get('title');
      if(!isValidLength(title,0,140)) {
        alert('Title must be longer than 0 characters and not more than 140.');
      }
      else {
        this.store.query('notebook',
          this.paramsFor('notebooks.notes').notebook_id)
          .then(
            (notebook) => {
              console.log(notebook);
              var note = this.store.createRecord('note', {
                title : this.controller.get('title'),
                notebook: notebook
              });
              console.log(note);
              note.save().then(() => {
                console.log('save successful');
                this.controller.set('title',null);
                this.refresh();
              }, function() {
                console.log('save failed');
              });
            }
          );
      }
    },
    deleteNote: function(note) {
      console.log('deleting note with title ' + note.get('title'));
      note.deleteRecord();
      note.save();
    }
  }
});
