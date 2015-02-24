Meteor.methods({
  create_department: function(dname,dicon,dparent) {
    
    var returnMessage = '';
    var department = {
      name: '', // Name of the department
      icon: '', // Icon used for department /font awesome
      parent: '',
    };
    var existingDepartment = Department.findOne( { name: dname } ); 
    if(!Department.findOne( { name:dparent } )) { dparent = ''; }
    if(!dicon) { dicon = 'gift'; }
    
    if(!existingDepartment) {
      department.name = dname;
      department.icon = dicon;
      var finddepartment_a = Department.findOne({name:dparent});
      if(finddepartment_a){ department.parent = finddepartment_a._id; }
      
      returnMessage = Department.insert(department);
    } else {
      existingDepartment.icon = dicon;
      var finddepartment_b = Department.findOne({name:dparent});
      existingDepartment.parent = finddepartment_b._id;
      Meteor.call('update_department', existingDepartment._id, existingDepartment);
      returnMessage = existingDepartment._id;
    }
    
    return returnMessage;
  },
  
  update_department: function(identity,upgrade) {
    var department = Department.findOne(identity);
    
    department.name = upgrade.name;
    department.icon = upgrade.icon;
    department.parent = '';
    if(upgrade.name == upgrade.parent) { upgrade.parent = ''; }
    var finddepartment = Department.findOne({name:upgrade.parent});
    if(finddepartment) { department.parent = finddepartment._id; }
    
    Department.update(identity,department);
  },
  
  remove_department: function(identity) {
    var department = Department.findOne(identity);
    
    Condition.find({department:identity}).forEach( function(condition) {
      Condition.remove(condition._id);
    });
    Department.find( {parent:department._id} ).forEach( function(child) {
      child.parent = ''; if(department.parent){ child.parent = department.parent; }
      Department.update(child._id,child);
    });

    Department.remove(department);
  }
})

Department = new Meteor.Collection('department');
/////////////////////////////////////////////////