Template.store.helpers({
  store: function() {
    return Store.findOne(this._id);
  },
  columncount: function() {
    return 'three';
  },
});