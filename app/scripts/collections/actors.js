var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


var Actor = Backbone.Model.extend({

});

var ActorsCollection = Backbone.Collection.extend({
  model: Actor,
  url: 'https://nuvi-challenge.herokuapp.com/activities'
});

module.exports = ActorsCollection;
