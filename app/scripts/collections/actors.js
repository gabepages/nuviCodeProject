var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


var Actor = Backbone.Model.extend({

});

var ActorsCollection = Backbone.Collection.extend({
  model: Actor,
  url: 'https://nuvi-challenge.herokuapp.com/activities',
  filterByProvider: function (provider) {
        var filtered = this.filter(function (activity) {
            return activity.get("provider") === provider;
        });
        return new ActorsCollection(filtered);
    }
});

module.exports = ActorsCollection;
