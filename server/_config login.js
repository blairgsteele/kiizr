Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.profile = options.profile;
    }
  Meteor.call('create_store', user);
  Meteor.call('create_bucket', user);
  
  return user;
});