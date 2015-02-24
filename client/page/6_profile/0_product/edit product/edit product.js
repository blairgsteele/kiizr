editproduct_id = ''; Session.set("editproduct_id", '');
editDepartment = ''; Session.set("editDepartment", '');

Template.editproduct.rendered = function() { 
  var product = Product.findOne(Session.get("editproduct_id"));
  if(!product) { Router.go('profile'); return; }
  
  uploadImage = product.image; Session.set("uploadImage",uploadImage);
  document.getElementById("inputname").value = product.name;
  document.getElementById("inputprice").value = product.price;
  document.getElementById("inputdescription").value = product.description;
  editDepartment = Department.findOne(product.department).name; Session.set("editDepartment",editDepartment);
};

Template.editproduct.events({
  'click #productdelete': function(e, template) {
    Meteor.call('delete_product', Session.get("editproduct_id"), function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
    Router.go('profile');
  },
  'click #productsubmit': function(e, template) {
    $('#productsubmit').transition('flash');
    
    var pname = template.find('#inputname').value; 
    var pprice = template.find('#inputprice').value; 
    var pdescription = template.find('#inputdescription').value; 
    var pdepartment = template.find('#inputdepartment').value; 
    
    if(!pname) { alert('Must name your product.'); return; }
    if(!pprice) { alert('Must enter a price for your product.'); return; }
    if(!pdescription) { alert('Please provide a short description of your product.'); return; }
    
    var oldproduct = Product.findOne(Session.get("editproduct_id"));
    var newproduct = {
      user: oldproduct.user,
      name: pname, 
      price: pprice,
      description: pdescription,
      department: editDepartment,
      image: Session.get("uploadImage"),
    }; 
    if(pdepartment){newproduct.department = pdepartment;}
    
    Meteor.call('update_product', oldproduct, newproduct, function (error, result) {
      if (error) { alert(error); } 
      else { /*alert(result);*/ } }); 
    
    Router.go('profile');
  },
});