Meteor.methods({
  create_message: function(convoid, mess) {
    
    var message = {
      userid: this.userId,
      date_create: moment().format('MMMM Do'),
      conversation: convoid,
      text: mess,
    };
    var conversation = Conversation.findOne(message.conversation);
    var sender = this.userId;
    var recipient;
    var type = 'comment' ;
    var link = Message.insert(message);
    var text = '';
    
    if(conversation.type === 'product'){ 
      text = ' commented on ';
      recipient = Product.findOne({conversation:convoid}).user; }
    
    if(conversation.type === 'order'){ 
      text = ' messaged you about ';
      var order = Order.findOne({conversation:convoid});
      if(order.merchant === Meteor.userId()){ recipient = order.customer; }
      if(order.customer === Meteor.userId()){ recipient = order.merchant; }
    }
    
    Meteor.call('create_notification', sender, recipient, type, link, text);
  },
  delete_message: function(messageid) {
    Meteor.call('remove_notification','comment',messageid);
    Message.remove(messageid);
  },
});

Conversation = new Meteor.Collection('conversation');
Message = new Meteor.Collection('message');
///////////////////////////////////////////