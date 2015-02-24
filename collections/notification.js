Meteor.methods({
  create_notification: function(sender,recipient,type,link,text) {
    var notification = {   
      date_create: moment().format('MMMM Do'),
      
      sender: sender,
      recipient: recipient,
      
      type: type,
      link: link,
      text: text,
      
      viewed: false,
    };
    
    Notification.insert(notification);
  },
  remove_notification: function(type,link) {
    var notification = Notification.findOne({type:type, link:link});
    
    if(notification){ Notification.remove(notification); }
  }
});

Notification = new Meteor.Collection('notification');
/////////////////////////////////////////////////////