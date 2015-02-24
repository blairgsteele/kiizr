isAdmin = false; Session.set("isAdmin", false);
checkAdmin = false; Session.set("checkAdmin", false);

a_selected_department = ''; Session.set("a_selected_department", '');

Template.department_a_manage.helpers({
  showedit: function() {
    if(Session.get("a_selected_department") !== '') { return true; }
    return false;
  },
  showcreate: function() {
    if(Session.get("a_selected_department") !== '') { return false; }
    return true;
  },
});
Template.department_a_list.helpers({
  list: function() {
    return Department.find( {parent:''} );
  },
});
Template.department_a_create.events({
  'click #submitdepartment': function(e, template) {
    $('#submitdepartment').transition('flash');
    var dname = template.find('#inputname').value; 
    var dicon = template.find('#inputicon').value; 
    var dparent = template.find('#inputdepartment').value; 
    if(!dname) { alert('Must name your department.'); return; }
    if(dparent === dname) { dparent = ''; }
    
    Meteor.call('create_department', dname, dicon, dparent, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
});
Template.department_a_edit.helpers({
  department: function() {
    return Department.findOne(Session.get("a_selected_department"));
  },
});
Template.department_a_edit.events({
  'click #exit': function(e, template) {
    a_selected_department = ''; Session.set("a_selected_department", '');
  },
  'click #submitdepartment': function(e, template) {
    $('#submitdepartment').transition('flash');
    
    var dname = template.find('#inputname').value; 
    var dicon = template.find('#inputicon').value; 
    var dparent = template.find('#inputdepartment').value; 
    if(!dname) { alert('Must name your department.'); return; }
    if(dparent === dname) { dparent = ''; }
    var department = Department.findOne(Session.get("a_selected_department"));
    department.name = dname; department.icon = dicon; department.parent = dparent;
    
    Meteor.call('update_department', department._id, department, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
});

Template.department_a_thumbnail.helpers({
  color: function() {
    if(Session.get("a_selected_department") === this._id) { return '#FFA200'; }
    return 'black';
  },
});
Template.department_a_thumbnail.events({
  'click #department_a_thumbnail': function(e, template) {
    a_selected_department = this._id; Session.set("a_selected_department", this._id);
  },
  'click #delete': function(e, template) {
    a_selected_department = ''; Session.set("a_selected_department", '');
    Meteor.call('remove_department', this._id, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
  },
});
Template.department_a_thumbnail.helpers({
  list: function() {
    return Department.find({ parent:this._id });
  },
});