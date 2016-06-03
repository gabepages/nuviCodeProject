var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var Backbone = require('backbone');
var moment = require('moment');

var App = React.createClass({
  getInitialState: function(){
    return{
      provider: 'facebook'
    }
  },
  changeProvider: function(provider){
    this.setState({
      'provider': provider
    });
  },
  render: function (){
      return(
        <div>
          <AppHeader provider={this.state.provider}  changeProvider={this.changeProvider}/>
          <div className="container-fluid">
            <FeedPanel collection={this.props.collection} provider={this.state.provider}/>
          </div>
        </div>
      )
  }
});

var AppHeader = React.createClass({
  changeToFacebook: function(){
    this.props.changeProvider('facebook');
  },
  changeToTwitter: function(){
    this.props.changeProvider('twitter');
  },
  changeToInstagram: function(){
    this.props.changeProvider('instagram');
  },
  changeToTumblr: function(){
    this.props.changeProvider('tumblr');
  },
  render: function(){
    var facebook, twitter, instagram, tumblr;
    if (this.props.provider == 'facebook'){
      facebook = 'highlight';
      twitter = '';
      instagram = '';
      tumblr = '';
    }else if (this.props.provider == 'twitter') {
      facebook = '';
      twitter = 'highlight';
      instagram = '';
      tumblr = '';
    }else if (this.props.provider == 'instagram') {
      facebook = '';
      twitter = '';
      instagram = 'highlight';
      tumblr = '';
    }else if (this.props.provider == 'tumblr') {
      facebook = '';
      twitter = '';
      instagram = '';
      tumblr = 'highlight';
    }
    return(
      <div className="header">
        <h1 id='title'><a target='_blank' href='https://www.nuvi.com/'>NUVI</a> Interview Code Project</h1>
        <div className="provider-tabs">
          <ul>
            <li id={facebook} onClick={this.changeToFacebook}>Facebook</li>
            <li id={twitter} onClick={this.changeToTwitter}>Twitter</li>
            <li id={instagram} onClick={this.changeToInstagram}>Instagram</li>
            <li id={tumblr} onClick={this.changeToTumblr}>Tumblr</li>
          </ul>
        </div>
      </div>
    )
  }
});

var FeedPanel = React.createClass({
  getInitialState: function(){
    return{
      activities: null,
      loading: false
    }
  },
  componentWillReceiveProps : function(){
    var self = this;
    this.setState({
      'loading': true
    });
    setTimeout(function(){
      self.componentWillMount();
    }, 500);

  },
  componentWillMount: function(){
    var self = this;
    var activities = this.props.collection;
    activities.fetch({
      success: function(collection, response){
        self.filterByProvider(self.props.provider);
      },
      error: function(collection, response){
        console.log(collection);
        console.log(response);
      }
    })

  },
  filterByProvider: function(provider){
    var filteredResults = this.props.collection.filterByProvider(provider);
    this.setState({
      'activities': filteredResults.models,
      'loading': false
    });

  },
  slideTextInput: function(id, e){
    e.preventDefault();
    var input = "#" + id;
    input = input.toString();
    $(input).slideToggle(500);
  },
  liked: function(e){
    e.preventDefault();
  },
  render: function(){
    if (this.state.loading){
      return(
        <div className='loading col-xs-12'>
          <i className="fa fa-cog fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }else if (this.state.activities){
      var listOfActivities = this.state.activities;
      var self = this;
      var activities = listOfActivities.map(function(item){
        var bindID = self.slideTextInput.bind(self, item.id);
        item = item.attributes;
        var username = '@' + item.actor_username;
        var usernamePlaceholder = "Hey " + username + "..."
        var date = moment(item.activity_date).format('MMMM Do, YYYY');
        return (
          <div key={item.id} className="activity col-xs-12 col-md-6 ">
            <div className="wrapper">
              <div className="col-md-3 side-bar">
                <img src={item.actor_avator} alt="" />
                <h3>{item.actor_name}</h3>
              <h4><a target='_blank' href={item.actor_url}>{username}</a></h4>
              </div>
              <div className="col-md-9 post">
                <div className="row status-bar">
                  <Status status={item.activity_sentiment} />
                  <div className="time">
                    <h3 id='date'>{date}</h3>
                  </div>
                </div>
                <div className="post-content">
                  <Post content={item.activity_message} contentType={item.activity_attachment_type}/>
                </div>
                <div className="post-footer">
                  <ul>
                    <li>
                      <p>{item.activity_likes}</p> <i className="fa fa-heart fa-2x" aria-hidden="true"></i>
                    </li>
                    <li>
                      <p>{item.activity_comments}</p> <i className="fa fa-comment fa-2x" aria-hidden="true"></i>
                    </li>
                    <li>
                      <p>{item.activity_shares}</p> <i className="fa fa-share-alt fa-2x" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <div className="buttons">
                    <a onClick={self.liked} href="#"><i className="fa fa-heart fa-lg" aria-hidden="true"></i> Like Post</a>
                    <a onClick={bindID} href="#"><i className="fa fa-reply fa-lg" aria-hidden="false"></i> Reply To Post</a>
                  </div>
                  <form>
                    <input type="text" className="form-control" placeholder={usernamePlaceholder} id={item.id} style={{'display':"none"}}/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      });
      return (
        <div className="row main-content">
          {activities}
        </div>
      )
    }else{
      return <div></div>
    }
  }
});

var Post = React.createClass({
  render: function(){
    if(this.props.contentType == null){
      return <p>{this.props.content}</p>
    }else{
      return <img id='media-content' src={this.props.content}/>
    }
  }
});

var Status = React.createClass({
  render: function(){
    if(this.props.status == -1){
      return (
        <div className='status'>
          <div id="colorstrip-red"></div>
          <h3>negative</h3>
        </div>
      )
    }else if (this.props.status == 0) {
      return (
        <div className='status'>
          <div id="colorstrip-blue"></div>
          <h3>neutral</h3>
        </div>
      )

    }else if (this.props.status == 1) {
      return(
        <div className='status'>
          <div id="colorstrip-green"></div>
          <h3>Positive</h3>
        </div>
      )
    }
  }
});



module.exports = App;
