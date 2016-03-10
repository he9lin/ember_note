import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('user'),
  notes: DS.hasMany('note'),
  noteCount: function() {
    return this.get('notes.length');
  }
});
