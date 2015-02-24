Template.profile.helpers({
  store: function() { return Store.findOne( {userid: Meteor.userId(), published: {$ne: false}} ); },
  columncount: function() { return 'three'; },
});