Template.product.rendered = function() { 
    Session.set('productconversation','comment');
};
Template.product.helpers({
  purchasecommand: function(){
    return 'Place order';
  },
  bucketcommand: function() {
    var bucket = Bucket.findOne({user: Meteor.user()._id});
    if(!bucket) { return; }
    if(bucket.productlist.indexOf(this._id) !== -1){ 
      $('#productbucket').css('width', '26.7%'); 
      $('#productpurchase').css('width', '72.7%');
      return 'Remove';
    } else { 
      $('#productbucket').css('width', '72.7%');
      $('#productpurchase').css('width', '26.7%'); 
      return 'Bucket';
    }
    if(Session.get('bucketcommand')) return Session.get('bucketcommand');
  },
  linktochild: function() {
    if(this.child !== ''){ return this.child; }
    return false;
  },
  store_id: function() {
    return Store.findOne( {userid: this.user} )._id;
  },
  departmentname: function() {
    return Department.findOne( this.department ).name;
  },
  departmenticon: function() {
    return Department.findOne( this.department ).icon;
  },
  username: function() {
    return Store.findOne( {userid: this.user} ).name;
  },
  showedit: function() {
    if(this.user === Meteor.userId()){ return true; }
    return false;
  },
  orders: function() {
    return Order.find({ product: this._id, complete: {$ne: true} });
  },
  convo: function() {
    if(Session.get('productconversation')) {
      
      if(Session.get('productconversation') === 'comment'){ 
        $('#discussbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        $('#commentbutton').css('border-bottom', '2px dashed rgba(255,162,0,0.9)');
        $('#adminbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        return Conversation.findOne(this.conversation); 
      }
      if(Session.get('productconversation') === 'discuss'){
        var order = Order.findOne({customer: Meteor.user()._id, product:this._id});
        $('#commentbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        $('#discussbutton').css('border-bottom', '2px dashed rgba(255,162,0,0.9)');
        $('#adminbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        return Conversation.findOne(order.conversation);
      }
      if(Session.get('productconversation') === 'admin'){
        $('#commentbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        $('#discussbutton').css('border-bottom', '2px dashed rgba(0,0,0,0.17)'); 
        $('#adminbutton').css('border-bottom', '2px dashed rgba(255,162,0,0.9)');
        return Conversation.findOne(order.conversation);
      }
      
    }
  },
  showdiscuss: function() {
    if(Session.get('productconversation') === 'discuss'){ return true; }
    var order = Order.findOne( {customer: Meteor.user()._id, product:this._id, complete: {$ne: true}} );
    
    if(order) { return true; }
    return false;
  },
  showadmin: function() {
    if(Session.get('productconversation') === 'admin'){ return true; }
    if(this.user === Meteor.user()._id){ return true;}
    return false;
  },
});

Template.product.events({
  'click #productpurchase': function(e, template) {
    $('#productpurchase').transition({animation:'tada',duration:'0.7s'});
    placeorder(this._id); Session.set('productconversation','comment');
  },
  'click #productbucket': function(e, template) {
    likeproduct(this._id);
  },
  'click #edit': function(e, template) {
    $('#submitdepartment').transition('flash');
    editproduct_id = this._id; Session.set("editproduct_id", editproduct_id);
    Router.go('editproduct');
  },
  'click #commentbutton': function(e, template) {
    Session.set('productconversation','comment');
  },
  'click #discussbutton': function(e, template) {
    Session.set('productconversation','discuss');
  },
  'click #adminbutton': function(e, template) {
    Session.set('productconversation','admin');
  },
});

Template.productdisplay_recent.helpers({
  productdisplayrecent: function() {
    return Product.find( {published: {$ne: false} } );
  },
  columncount: function() {
    return 'three';
  },
});
Template.productdisplay_search.helpers({
  productdisplayrecent: function() {
    return Product.find( {published: {$ne: false} } );
  },
  columncount: function() {
    return 'three';
  },
});
Template.productdisplay_my_recent.helpers({
  productdisplayrecent: function() {
    return Product.find( { user:Meteor.userId(), published: {$ne: false} } );
  },
  columncount: function() {
    var count = Product.find( { user:Meteor.userId(), published: {$ne: false} } ).count();
    if(count === 1){ return 'one'; } if(count === 2){ return 'two'; }
    return 'three';
  },
});
Template.productdisplay_store_recent.helpers({
  productdisplayrecent: function() {
    return Product.find( { user:this.userid, published: {$ne: false} } );
  },
  columncount: function() {
    var count = Product.find( { user:this.userid, published: {$ne: false} } ).count();
    if(count === 1){ return 'one'; } if(count === 2){ return 'two'; }
    return 'three';
  },
});
Template.productdisplay_department_recent.helpers({
  productdisplayrecent: function() {
    return Product.find( {department: this._id, published: {$ne: false} } );
  },
  columncount: function() {
    return 'three';
  },
});  
Template.productdisplay_bucket.helpers({
  productdisplaybucket: function() {
    var bucket = Bucket.findOne({user: Meteor.user()._id});
    var i, productlist = [];
    for (i = 0; i < bucket.productlist.length; i++) { 
      var product = Product.findOne(bucket.productlist[i]);
      productlist.push(product);
    }
    return productlist;
  },
  columncount: function() {
    return 'three';
  },
});

Template.product_thumbnail_square.helpers({
  commentcount: function() {
    return Message.find( {conversation: this.conversation} ).count();
  },
  store_id: function() {
    return Store.findOne( {userid: this.user} )._id;
  },
  storename: function() {
    var store = Store.findOne( {userid: this.user} );
    return store.name;
  },
  showedit: function() {
    if(this.user === Meteor.userId()){ return true; }
    return false;
  },
  departmenticon: function() {
    if(!this.department) { return ''; }
    var department = Department.findOne( this.department ); 
    if(department){ return department.icon; }
  },
});

Template.product_thumbnail_square.events({
  'click #edit': function(e, template) {
    $('#edit').transition({animation:'tada',duration:'1s'});
    editproduct_id = this._id; Session.set("editproduct_id", editproduct_id);
    Router.go('editproduct');
  },
});


Template.product_thumbnail_square.events({
  'click #like': function(e, template) {
    likeproduct(this._id);
  },
});
Template.product_thumbnail_square.helpers({
  editcolor_bg: function() {
    var bucket = Bucket.findOne({user: Meteor.user()._id});
    if(!bucket && !Session.get('bucketcommand')) { return; }
    if(bucket.productlist.indexOf(this._id) !== -1){ 
      return 'rgba(255,162,0,0.9)';
    } else { 
      return 'rgba(255,255,255,1)';
    }
  },
  editcolor_co: function() {
    var bucket = Bucket.findOne({user: Meteor.user()._id});
    if(!bucket && !Session.get('bucketcommand')) { return; }
    if(bucket.productlist.indexOf(this._id) !== -1){ 
      return 'rgba(255,255,255,1)';
    } else { 
      return 'rgba(0,0,0,1)';
    }
  },
});

function placeorder(product) {
  if(Product.findOne(product).child){ return; }
  Meteor.call('create_order',Meteor.user()._id,product);
  Session.set('productconversation','discuss');
}
function likeproduct(product) {
  
  var bucket = Bucket.findOne({user: Meteor.user()._id});
  if(!bucket) { return; }

  var productlist = bucket.productlist;
  var index = productlist.indexOf(product);
    
  if(index === -1) { // does not exist in the array ADD
    if(Product.findOne(product).child){ return; }
    productlist.push(product); 
    Session.set('bucketcommand','Remove from bucket');
  }
  else { // if it does REMOVE
    productlist = _.without(bucket.productlist, product);
    Session.set('bucketcommand','Add to bucket');
  }
    
  bucket.productlist = productlist;
  Meteor.call('update_bucket',bucket._id,bucket);
}