Template.menu.events({
  'click #menu': function(e) {
    toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtohome': function(e) {
    Router.go('home'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtodepartments': function(e) {
    Router.go('departments'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtobucket': function(e) {
    Router.go('bucket'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtonotifications': function(e) {
    Router.go('notifications'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtoprofile': function(e) {
    Router.go('profile'); toggleSearch_hide(); toggleMenu_hide();
  },
  'click .navtoadmin': function(e) {
    Router.go('admin'); toggleSearch_hide(); toggleMenu_hide();
  },
});
Template.menu.helpers({
  showadmin: function(){
  	return Session.get("isAdmin");
  },
});
function toggleSearch_hide() { searchswitch = false; $('#searchbar').addClass('hiddensearch'); return false; }
function toggleMenu_hide() { menuswitch = false; $('.menu').addClass('hiddenmenu'); return false; }