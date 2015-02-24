Router.configure({ layoutTemplate: 'layout' });

Router.onBeforeAction(function () {
  var route = Router.current().route.getName()
  if (!Meteor.userId() && ( route !== 'login' && route !== 'signup'  && route !== 'register' ) ) {
    if(route !== 'privacypolicy' && route !== 'termsofservice'){ this.render('register'); }
    else { this.next(); }
  } else if(Meteor.userId()){
    if(route === 'register' || route === 'login' || route === 'signup'){
      Router.go('home');}
    else { this.next(); }
  } else { this.next(); }
});

Router.onAfterAction(function () {
  adjustContentHeight();
  uploadImage = '' ; Session.set("uploadImage",uploadImage);
  var route = Router.current().route.getName()
  if(Meteor.user() && checkAdmin === false) {
    checkAdmin = true;
    var email = Meteor.user().emails[0].address;
    if(email === 'christopher.john.gayle@gmail.com'){ isAdmin = true; Session.set("isAdmin", true); }
    if(email === 'chris_gayle_jm@live.com'){ isAdmin = true; Session.set("isAdmin", true); }
  }
});

Router.map(function() {  
  this.route('admin', { path: '/x01y20-3z994-1', });
  this.route('privacypolicy', { path: '/privacy', });
  this.route('termsofservice', { path: '/terms-of-use', });
  this.route('register', { path: '/', });
  
    this.route('signup', { path: '/signup', });
    this.route('login', { path: '/login', });
  ///////////////////////////////////////////////////////////////////
  this.route('home', { path: '/home', }); 
  
    this.route('subscriptions', { path: '/subscriptions', });
    this.route('explore', { path: '/explore', });
    this.route('map', { path: '/map', }); 
    this.route('search', { path: '/search', }); 
  ///////////////////////////////////////////////////////////////////
  this.route('departments', { path: '/department', });
  
    this.route('department', {
      path: '/department/:_id', 
      data: function() { return Department.findOne(this.params._id); }
    }); 
  ///////////////////////////////////////////////////////////////////
  this.route('bucket', { path: '/bucket', });
  
    this.route('favorites', { path: '/favorites', });
    this.route('cart', { path: '/cart', });
    this.route('receipts', { path: '/receipts', }); 
  ///////////////////////////////////////////////////////////////////
  this.route('notifications', { path: '/notifications', });
  ///////////////////////////////////////////////////////////////////
  this.route('profile', { path: '/profile', });     
  ///////////////////////////////////////////////////////////////////
  this.route('product', { 
      path: '/product/:_id', 
      data: function() { return Product.findOne(this.params._id); }
    }); 
  
    this.route('createproduct', { path: '/createproduct', });  
    this.route('editproduct', { path: '/editproduct', }); 
  ///////////////////////////////////////////////////////////////////
  this.route('store', { 
      path: '/store/:_id', 
      data: function() { return Store.findOne(this.params._id); }
    }); 
  
    this.route('orders', { path: '/orders', });
    this.route('settings', { path: '/settings', });
    this.route('editstore', { path: '/editstore', });
  ///////////////////////////////////////////////////////////////////
  
  });

function adjustContentHeight() {
    $('#content').css('height', window.innerHeight - 47);
    $('#right').css('height', window.innerHeight - 47);
    $('#searchbar').css('width', $('#search').width() - 54);
}
