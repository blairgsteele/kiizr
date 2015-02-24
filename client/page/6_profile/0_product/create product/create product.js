Template.uploadimage.helpers({
  background: function() {
    return Session.get("uploadImage");
  },
});

Template.departmentselect.rendered = function() { 
    $('.ui.dropdown').dropdown();
};
Template.conditionselect.rendered = function() { 
    $('.ui.dropdown').dropdown();
};
Template.productdelivery.rendered = function() { 
    $('.ui.checkbox').checkbox();
};

Template.departmentselect.helpers({
  departmentlist: function() {
    return Department.find();
  },
  department: function() {
    return Session.get("editDepartment");
  },
});

Template.createproduct.events({
  'click #productsubmit': function(e, template) {
    $('#productsubmit').transition('flash');
    
    var pname = template.find('#inputname').value; 
    var pprice = template.find('#inputprice').value; 
    var pdescription = template.find('#inputdescription').value; 
    var pdepartment = template.find('#inputdepartment').value; 
        
    if(!pname) { alert('Must name your product.'); return; }
    if(!pprice) { alert('Must enter a price for your product.'); return; }
    if(!pdescription) { alert('Please provide a short description of your product.'); return; }
    if(!Session.get("uploadImage")) { alert('Please upload an image.'); return; }
    
    Meteor.call('create_product', pname, pprice, pdescription, pdepartment, Session.get("uploadImage"), function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
    
    Router.go('profile');
  },
});