Template.notifications.helpers({
  notificationlist: function() {
    return Notification.find( {recipient: Meteor.userId()} );
  },
});

Template.notification_comment.helpers({
  product_id: function() {
    var message = Message.findOne(this.link);
    if(!message){ Meteor.call('remove_notification', this._id); return ''; }
    
    var conversation = Conversation.findOne(message.conversation);
    if(conversation.type === 'product') return Product.findOne({conversation: message.conversation, child: ''})._id;
    if(conversation.type === 'order') {
      var order = Order.findOne({conversation: message.conversation});
      var product = Product.findOne(order.product);
      return product._id;
    }
  },
  sentby: function() {
    return Store.findOne({userid:this.sender}).name;
  },
  productname: function() {
    var message = Message.findOne(this.link);
    if(!message){ Meteor.call('remove_notification', this._id); return ''; }
    
    var conversation = Conversation.findOne(message.conversation);
    if(conversation.type === 'product') return Product.findOne({conversation: message.conversation, child: ''}).name;
    if(conversation.type === 'order') {
      var order = Order.findOne({conversation: message.conversation});
      var product = Product.findOne(order.product);
      return product.name;
    }
  },
  datemade: function() {
    return this.date_create;
  },
  themessage: function() {
    return this.text;
  },
});