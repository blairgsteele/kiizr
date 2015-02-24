Template.settings.events({
  'click .navtovieworders': function(e) {
    Router.go('orders'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtoeditstore': function(e) {
    Router.go('editstore'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtocreateproduct': function(e) {
    Router.go('createproduct'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtoprivacypolicy': function(e) {
    Router.go('privacypolicy'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtotermsofuse': function(e) {
    Router.go('termsofservice'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtoadmin': function(e) {
    Router.go('admin'); toggleSearch_hide(); toggleMenu_hide();
  },
});

Template.settings.helpers({
  showadmin: function(){
  	return Session.get("isAdmin");
  },
});