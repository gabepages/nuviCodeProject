var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var ReactDOM  = require('react-dom');

//Components
var App = require('./components/nuvi-UI.jsx');

//Models and Collection
var ActorsCollection = require('./collections/actors');

var actors = new ActorsCollection();

// //Rendering Components
// var appContainer = $('#app')[0];
// ReactDOM.render(
//       React.createElement(App, {collection: actors}),
//       appContainer
//     );
