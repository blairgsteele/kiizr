Meteor.methods({
  create_receipt: function(user,plist) {
    receipt = {
      userid: user._id, 
      
      list: plist,
    };
    return Receipt.insert(receipt);
  },
  
  update_receipt: function(receiptid,upgrade) {
    var receipt = Receipt.findOne(receiptid);
    
    receipt.userid = upgrade.userid;

    receipt.list = upgrade.list;
    
    Receipt.update(receipt);
  },

  receiptadd: function(receiptid,productid) {
    var receipt = Receipt.findOne(receiptid);

    receipt.list.push(productid);
  },

  receiptremove: function(receiptid,productid) {
    var receipt = Receipt.findOne(receiptid);

    var index = receipt.list.indexOf(productid);
    if(index > -1) { receipt.list.splice(index, 1); }
  },
})

Receipt = new Meteor.Collection('receipt');
///////////////////////////////////////////