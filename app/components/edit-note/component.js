import Ember from 'ember';

export default Ember.Component.extend({
  click: function(event) {
    console.log(event);
  },

  actions: {
    saveNote: function() {
      this.get('note').save();
    },
    closeNote: function() {
      this.sendAction('close');
    }
  }
});
