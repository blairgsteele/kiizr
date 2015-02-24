Meteor.startup(function() {
  Uploader.finished = function(fileInfo, templateContext) {
    uploadImage = templateContext.url; Session.set("uploadImage", uploadImage);
  }
});