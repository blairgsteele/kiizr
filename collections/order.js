Meteor.methods({
  create_order: function(customer,product) {
    var previousOrder = Order.findOne({customer: customer, product: product, complete: false });
    if(previousOrder) { 
      if(!previousOrder.complete){ 
        return previousOrder._id; 
      } 
    } else {
    }
    
    order = {
      customer: customer,
      merchant: Product.findOne(product).user,
      product: product,

      complete: false,
      code: '',
      
      conversation: '',
    };

    var conversation = {
      type: 'order',
      date_create: moment().format('MMMM Do'),
      active_date: moment().format('MMMM Do'),
    }; 
    order.conversation = Conversation.insert(conversation);
    order.code = Random.hexString(4).toUpperCase();
    
    return Order.insert(order);
  },
  
  update_order: function(orderid,update) {
    Order.update(orderid,update);
  },
  remove_order: function(orderid) {
    Order.remove(orderid);
  }
})

Order = new Meteor.Collection('order');
///////////////////////////////////////