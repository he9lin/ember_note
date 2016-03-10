import Mirage/*, {faker} */ from 'ember-cli-mirage';
import Ember from 'ember';

export function getAllJSONAPI(config, path, type) {
  config.get(path, function(db/*, request*/) {
    return {
      data: db[type].map(attrs => (
        {type: type, id: attrs.id, attributes: attrs }
      ))
    };
  });
}

export function postJSONAPI(config, path, type) {
  config.post(path, function(db, request) {
    Ember.Logger.debug(request.requestBody);
    var data = JSON.parse(request.requestBody).data.attributes;
    if (data) {
      let model = db[type].insert(data);
      return {
        data: {
          type: type,
          id: model.id,
          attributes: model
        }
      };
    } else {
      return new Mirage.Response(400, {some: 'header'}, {message: 'data cannot be blank'});
    }
  });
}

export function getSingleRecordJSONAPI(config, path, type, {hasMany: hasMany, belongsTo: belongsTo} = {}) {
  config.get(path + '/:id', function(db, request) {
    let record = db[type].find(request.params.id);

    let included = [];
    let relationships = null;
    if (!belongsTo) { belongsTo = [];} //make sure its array
    if (!hasMany) { hasMany = [];} //make sure its array

    belongsTo.forEach(m => {
      let model = db[m.type].find(record[`${m.name}_id`]);
      if (model) {
        included = included.concat({
          type: m.type,
          id: model.id,
          attributes: model
        });
        if(Ember.isEmpty(relationships)) { relationships = {}; }

        let rel = {};
        rel[m.name] = {
          data: {
            type: m.type,
            id: model.id
          }
        };
        relationships = Ember.merge(relationships, rel);
      }
    });

    hasMany.forEach(m => {
      let query = {};
      query[`${m.parent}_id`] = record.id;

      let collection = db[m.type].where(query);

      if (!Ember.isEmpty(collection)) {
        let rel = {};
        rel[m.parent] = {
          data: {
            type: m.parent,
            id: record.id
          }
        };

        let collectionIncluded = collection.map(attrs => ({
            type: m.type,
            id: attrs.id,
            attributes: attrs,
            relationships: rel
          }));

        included = included.concat(collectionIncluded);

        if(Ember.isEmpty(relationships)) { relationships = {}; }
        let mRel = {};
        mRel[m.type] = {
          data: collection.map(attrs => (
            {type: m.type, id: attrs.id}
          ))
        };
        relationships = Ember.merge(relationships, mRel);
      }

    });

    if (record) {
      let toReturn = {
        data: {
          type: type,
          id: record.id,
          attributes: record
        }
      };

      if (!Ember.isEmpty(relationships)) {
        toReturn.data['relationships'] = relationships;
      }

      if (!Ember.isEmpty(included)) {
        toReturn['included'] = included;
      }

      return toReturn;
    } else {
      return new Mirage.Response(422, {some: 'header'}, {message: 'no such record'});
    }
  });
}

export function deleteSingleRecordJSONAPI(config, path, type) {
  config.del(path + '/:id', function(db, request) {
    let record = db[type].find(request.params.id);
    db[type].remove(request.params.id);
    if (record) {
      return new Mirage.Response(204);
    } else {
      return new Mirage.Response(400, {some: 'header'}, {message: 'data cannot be blank'});
    }
  });
}

export function patchSingleRecordJSONAPI(config, path, type) {
  config.patch(path + '/:id', function(db, request) {
    Ember.Logger.debug(request.requestBody);
    var data = JSON.parse(request.requestBody).data.attributes;
    if (data) {
      return {
        data: {
          type: type,
          id: request.params.id,
          attributes: data
        }
      };
    } else {
      return new Mirage.Response(400, {some: 'header'}, {message: 'data cannot be blank'});
    }
  });
}
