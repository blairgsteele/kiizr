Meteor.methods({
  create_product: function(name, price, description, department, image) {
    
    var product = {
      user: this.userId,
      name: name, 
      price: price,
      description: description,
      department: '',
      image: image,
      
      date_create: moment().format('MMMM Do'),
      date_modify: '',
      
      published: true, parent: '', child: '',
      conversation: '',
    };
    
    var conversation = {
      type: 'product',
      date_create: moment().format('MMMM Do'),
      active_date: moment().format('MMMM Do'),
    }; 
    product.conversation = Conversation.insert(conversation);
    
    var insertdepartment = Department.findOne( {name: department} );
    if(insertdepartment) { product.department = insertdepartment._id; }
    
    Product.insert(product); 
    return 'Your new product ' + product.name + ' has been added. (' + product.price + ')';
  },
  update_product: function(oldproduct,newproduct) {
    
    var product = {
      user: newproduct.user,
      name: newproduct.name, 
      price: newproduct.price,
      description: newproduct.description,
      image: newproduct.image,
      department: '',
      
      date_create: oldproduct.date_create,
      date_modify: moment().format('MMMM Do'),
      
      published: true, parent: '', child: '',
      conversation: oldproduct.conversation,
    }; 
    
    var insertdepartment = Department.findOne( {name: newproduct.department} );
    if(insertdepartment) { product.department = insertdepartment._id; }
    
    oldproduct.published = false;
    
    if(Order.findOne( {product:oldproduct._id} )) {
      product.parent = oldproduct._id;
      oldproduct.child = Product.insert(product); 
      Product.update(oldproduct._id,oldproduct);
    } else if(oldproduct.parent) {
      var ancestorproduct = Product.findOne(oldproduct.parent);
      product.parent = ancestorproduct._id;
      ancestorproduct.child = Product.insert(product);
      Product.update(ancestorproduct._id,ancestorproduct);
      Product.remove(oldproduct._id);
    } else {
      Product.insert(product);
      Product.remove(oldproduct._id);
    }
    
    return 'Your product ' + product.name + ' has been updated. (' + product.price + ')';
  },
  delete_product: function(identity) {
    var deleteproduct = Product.findOne(identity);
    
    deleteproduct.published = false;
    Product.update(deleteproduct._id,deleteproduct);
    return 'Your product ' + deleteproduct.name + ' has been removed!';
    
  },
});

Product = new Meteor.Collection('product'); Product.initEasySearch('name');
///////////////////////////////////////////////////////////////////////////