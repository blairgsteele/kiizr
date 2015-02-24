Template.conversationinput.events({
  'click #sendmessage': function(e, template) {
    $('#sendmessage').transition('flash');
    
    var message = template.find('#inputmessage').value; if(!message){ return; }
    document.getElementById("inputmessage").value = '';
    
    Meteor.call('create_message', this._id, message, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
});
Template.conversationhistory.helpers({
  messagelist: function() {
    return Message.find( {conversation: this._id} );
  },
});

Template.conversationmessage.events({
  'click #delete': function(e, template) {
    Meteor.call('delete_message', this._id, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
  'click #admindelete': function(e, template) {
    Meteor.call('delete_message', this._id, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
  'click #ownerdelete': function(e, template) {
    Meteor.call('delete_message', this._id, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
});
Template.conversationmessage.helpers({
  username: function() {
    return Store.findOne( {userid: this.userid} ).name;
  },
  message: function() {
    return this.text;
  },
  showdelete: function() {
    if(this.userid === Meteor.userId()){ return true; }
    else{ return false; }
  },
  showownerdelete: function() {
    if(this.userid === Meteor.userId()){ return false; }
    if(Product.findOne( {conversation: this.conversation} ).user === Meteor.userId()){ return true; }
    else{ return false; }
  },
  showadmindelete: function() {
    if(this.userid === Meteor.userId()){ return false; }
    if(Product.findOne( {conversation: this.conversation} ).user === Meteor.userId()){ return false; }
    if(isAdmin){ return true; }
    else{ return false; }
  },
});