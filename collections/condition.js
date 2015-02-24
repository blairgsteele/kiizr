Meteor.methods({
  create_condition: function(cname,departmentid) {
    var condition = {
      name: cname, // Name of the store
      
      department: departmentid, // id for the department the condition is used in
    };
    return Condition.insert(condition);
  },
  
  update_condition: function(identity,upgrade) {
    var condition = Condition.findOne(identity);
    
    condition.name = upgrade.name;
    
    Condition.update(condition);
  },
  
  remove_condition: function(identity) {
    var condition = Condition.findOne(identity);
    
    Condition.remove(condition);
  }
})

Condition = new Meteor.Collection('condition');
///////////////////////////////////////////////