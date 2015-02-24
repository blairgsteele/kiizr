Template.departments.helpers({
  departments: function() {
    return Department.find({ parent:'' });
  },
});
Template.department_thumbnail_sub.helpers({
  departments: function() {
    return Department.find({ parent:this._id });
  },
  productcount: function() {
    return Product.find({ department:this._id, published: {$ne: false}  }).count();
  },
});

