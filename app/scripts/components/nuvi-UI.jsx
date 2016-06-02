var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var Backbone = require('backbone');

var App = React.createClass({
  getInitialState: function(){
    return{
      actors: null
    }
  },
  componentWillMount: function(){
    var self = this;
    var actors = this.props.collection;
    actors.fetch({
      success: function(collection, response){
        console.log(response);
        self.setState({'actors': response});
      },
      error: function(collection, response){
        console.log(collection);
        console.log(response);
      }
    })

  },
  render: function(){
    if (this.state.actors){
      var actors = this.state.actors;
      var actorsName = actors.map(function(item){
        return <h1 key={item.id}>{item.actor_username} posted on {item.provider}</h1>
      });
      return (
        <div>{actorsName}</div>
      )
    }else{
      return <div></div>
    }
  }
});

module.exports = App;
