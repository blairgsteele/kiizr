Template.header.helpers({
  showmenu: function(){
    if(!Meteor.user()){ return false; }
    
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Register') { return false; }
    if(currentTitle === 'Signup') { return false; }
    if(currentTitle === 'Login') { return false; }
    if(currentTitle === 'Privacypolicy' || currentTitle === 'Termsofservice') {
      if(!Meteor.user()){ return false; }
      else { return true; }
    }
    return true;
  },
  
  showsearch: function(){
    if(!Meteor.user()){ return false; }
    
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Home') { return true; }
    return false;
  },
  showsettings: function(){
    if(!Meteor.user()){ return false; }
    
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Profile') { return true; }
    if(currentTitle === 'Store'){ if(this.userid === Meteor.user()._id){ return true; } }
    return false;
  },
  showreturnbase: function(){
    if(!Meteor.user()){ return false; }
    
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Settings') { return true; }
    if(currentTitle === 'Editstore') { return true; }
    if(currentTitle === 'Privacypolicy') { return true; }
    if(currentTitle === 'Termsofservice') { return true; }
    
    return false;
  },
  showreturntop: function(){
    if(!Meteor.user()){ return false; }
    
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Createproduct') { return true; }
    if(currentTitle === 'Settings') { return true; }
    if(currentTitle === 'Editstore') { return true; }
    
    if(currentTitle === 'Department') { return true; }
    if(currentTitle === 'Departments') { return true; }
    if(currentTitle === 'Notifications') { return true; }
    if(currentTitle === 'Bucket') { return true; }
    
    if(currentTitle === 'Editproduct') { return true; }
    if(currentTitle === 'Privacypolicy') { return true; }
    if(currentTitle === 'Termsofservice') { return true; }
    if(currentTitle === 'Admin') { return true; }
    if(currentTitle === 'Orders') { return true; }
    return false;
  },
  title: function(){
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Register') { return 'Join the family'; }
    if(currentTitle === 'Signup') { return 'Sign up'; }
    if(!Meteor.user()){ return 'Join the family'; }
    if(currentTitle === 'Editstore') { return 'Customize'; }
    if(currentTitle === 'Createproduct') { return 'Create product'; }
    if(currentTitle === 'Privacypolicy') { return 'Privacy policy'; }
    if(currentTitle === 'Termsofservice') { return 'Terms of use'; }
    if(currentTitle === 'Editproduct') { return 'Edit product'; }
    if(currentTitle === 'Department') { return this.name[0].toUpperCase() + this.name.substring(1); }
    return currentTitle;
  },
})

Template.header.events({
  'click #menuswitch': function(e) {
    if(!Meteor.user()){ return false; }
    toggleMenu(); return true;
  },
  'click #searchswitch': function(e) {
    if(!Meteor.user()){ return false; }
    toggleSearch(); return true;
  },
  'click .returnbutton': function(e) {
  	var routeName = Router.current().route.getName();
		var currentTitle = routeName[0].toUpperCase() + routeName.substring(1);
    if(currentTitle === 'Department') { Router.go('departments'); }
    if(currentTitle === 'Departments') { Router.go('home'); }
    if(currentTitle === 'Notifications') { Router.go('home'); }
    if(currentTitle === 'Bucket') { Router.go('home'); }
    
    if(currentTitle === 'Login') { Router.go('register'); }
    if(currentTitle === 'Signup') { Router.go('register'); }
    if(currentTitle === 'Settings') { Router.go('profile'); }
      if(currentTitle === 'Admin') { Router.go('settings'); }
      if(currentTitle === 'Editstore') { Router.go('settings'); }
      if(currentTitle === 'Orders') { Router.go('settings'); }
      if(currentTitle === 'Createproduct') { Router.go('settings'); }
      if(currentTitle === 'Editproduct') { Router.go('profile'); }
      if(currentTitle === 'Privacypolicy' || currentTitle === 'Termsofservice') { 
        if(!Meteor.user()){ Router.go('signup'); }
        else { Router.go('settings'); }
      }
  },
  'click #settings': function(e) {
    Router.go('settings'); toggleSearch_hide(); toggleMenu_hide();
  },
});
menuswitch = false; searchswitch = false;
function toggleMenu() { if(menuswitch===false){ toggleMenu_show(); return false; } else { toggleMenu_hide(); return false; } }
function toggleMenu_show() { menuswitch = true; $('.menu').removeClass('hiddenmenu'); return false; }
function toggleMenu_hide() { menuswitch = false; $('.menu').addClass('hiddenmenu'); return false; }
function toggleSearch() { if(searchswitch===false){ toggleSearch_show(); return false; } else { toggleSearch_hide(); return false; } }
function toggleSearch_show() { searchswitch = true; $('#searchbar').removeClass('hiddensearch'); return false; }
function toggleSearch_hide() { searchswitch = false; $('#searchbar').addClass('hiddensearch'); return false; }
