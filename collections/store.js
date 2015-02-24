Meteor.methods({
  create_store: function(user) {
    store = {
      userid: user._id, 
      
      picture: '', // display picture of the store
      banner: '', // banner image of the store
      
      firstname: user.profile.firstname,
      lastname: user.profile.lastname,
      
      name: user.emails[0].address, // Name of the store
      description: '', // Description of the store
      
      email: user.emails[0].address, // Contact email for the store
      phone: user.phonenumber, // Contact phone number for store
    };
    return Store.insert(store);
  },
  
  update_store: function(identity,upgrade) {
    var store = Store.findOne(identity);
    
    store.picture = upgrade.picture;
    store.banner = upgrade.banner;
    
    store.userid = upgrade.userid;
    store.name = upgrade.name;
    store.description = upgrade.description;
    store.email = upgrade.email;
    store.phone = upgrade.phone;
    
    Store.update(identity,store);
  },
})

Store = new Meteor.Collection('store');
///////////////////////////////////////