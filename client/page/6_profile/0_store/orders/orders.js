
Template.orders.helpers({
  orders: function(){
  	return Order.find({ complete: {$ne: true} });
  },
});

Template.order_thumbnail.helpers({
  product_id: function(){
    return this.product;
  },
  productimage: function(){
    var product = Product.findOne(this.product);
    if(product){ return product.image; }
  },
  productname: function(){
    var product = Product.findOne(this.product);
    if(product){ return product.name; }
  },
  productprice: function(){
    var product = Product.findOne(this.product);
    if(product){ return product.price; }
  },
  customername: function(){
    var store = Store.findOne({userid: this.customer});
    if(store){ return store.firstname + ' ' + store.lastname; }
  },
  showconfirmation: function(){
    if(this.complete){ return false; }
    return true;
  },
});

Template.order_quicklink.helpers({
  product_id: function(){
    return this.product;
  },
  complete: function(){
    return JSON.stringify(this.complete);
  },
  messagecount: function(){
    return Message.find({conversation: this.conversation}).count();
  },
  customername: function(){
    var store = Store.findOne({userid: this.customer});
    if(store){ return store.firstname + ' ' + store.lastname; }
  },
});

Template.order_thumbnail.events({
  'click #completeorderbutton': function(event, template) {
    this.complete = true;
    Meteor.call('update_order',this._id,this);
  },
  'click #cancelorderbutton': function(event, template) {
    this.complete = true;
    Meteor.call('update_order',this._id,this);
  },
});
