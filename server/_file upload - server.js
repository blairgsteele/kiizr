Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName !== null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix !== null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      var code = Random.hexString(17);
      if(fileInfo) {
        console.log(JSON.stringify(fileInfo) + ' renamed ' + code);
      }
      return code;//fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      gm(this.uploadDir + fileInfo).resize(320,320).autoOrient().write(this.uploadDir+fileInfo, function (err) {
        if (!err) console.log(this.uploadDir+fileInfo + ' uploaded.');
      });
      if (formData && formData._id !== null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });
});