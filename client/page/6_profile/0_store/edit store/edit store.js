Template.editstore.helpers({
  name: function(){
    return Store.findOne({userid:Meteor.user()._id}).name;
  },
  description: function(){
    return Store.findOne({userid:Meteor.user()._id}).description;
  },
  profile: function(){
    if(Session.get("uploadImage") && uploadstoreprofile){
      if(uploadstoreprofile) {storeprofile = uploadImage;}
      uploadstoreprofile = false;
      return storeprofile;
    }
    if(storeprofile){ return storeprofile; }
    return Store.findOne({userid:Meteor.user()._id}).picture;
  },
  banner: function(){
    if(Session.get("uploadImage") && uploadstorebanner){
      if(uploadstorebanner) {storebanner = uploadImage;}  
      uploadstorebanner = false;
      return storebanner;
    }
    if(storebanner){ return storebanner; }
    return Store.findOne({userid:Meteor.user()._id}).banner;
  },
});

storebanner = ''; storeprofile = '';
uploadstorebanner = false; uploadstoreprofile = false;

Template.editstore.events({
  'click #inputstorebanner': function(e) { 
     uploadstoreprofile = false;                
     uploadstorebanner = true;                                     
  },
  'click #inputstoreprofile': function(e) { 
     uploadstorebanner = false;      
     uploadstoreprofile = true;                                   
  }
});

Template.editstore.events({
  'click #storesubmit': function(e, template) {
    $('#storesubmit').transition('flash');
    
    var pname = template.find('#inputstorename').value; 
    var pdescription = template.find('#inputstoredescription').value; 
    
    if(!pname) { alert('Must name your store.'); return; }
    
    var oldstore = Store.findOne({userid: Meteor.user()._id});
    var newstore  = {      
      userid: oldstore.userid, 
      
      picture: oldstore.picture, // display picture of the store
      banner: oldstore.banner, // banner image of the store
      
      name: pname, // Name of the store
      description: pdescription, // Description of the store
      
      email: oldstore.email, // Contact email for the store
      phone: oldstore.phone, // Contact phone number for store
    }; 
    if(storebanner){newstore.banner = storebanner;}
    if(storeprofile){newstore.picture = storeprofile;}
    storeprofile = ''; storebanner = '';
    
    Meteor.call('update_store', oldstore._id, newstore, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
    
    Router.go('profile');
  },
});