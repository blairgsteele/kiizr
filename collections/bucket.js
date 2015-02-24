Meteor.methods({
  create_bucket: function(user) {
    bucket = {
      user: user._id, 
      
      productlist: [],
    };
    return Bucket.insert(bucket);
  },
  
  update_bucket: function(id,upgrade) {
    if(!id || !upgrade){ return 'failed'; }
    return Bucket.update(id,upgrade);
  },
})

Bucket = new Meteor.Collection('bucket');
/////////////////////////////////////////