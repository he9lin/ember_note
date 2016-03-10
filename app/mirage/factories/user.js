import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  email: faker.internet.email()
});
