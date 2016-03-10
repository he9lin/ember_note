import Mirage /*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: function(i) {
    return 'Notebook ' + i;
  }
});
