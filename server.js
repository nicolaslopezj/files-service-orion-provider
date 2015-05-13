var uploadServer = process.env.FILES_BASE_URL;
var apiToken = process.env.FILES_ENV_TOKEN;


Meteor.methods({
  sitesRequestUploadKey: function () {
    if (!Roles.userHasPermission(this.userId, 'siteFiles.upload')) {
      throw new Meteor.Error('no-permissions', 'The user does not have permissions to upload files')
    }
    
    try {
      var request = HTTP.post(uploadServer + 'key', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiToken
        }
      }); 
      return {
        url: uploadServer + 'files?key=' + request.data.key,
        key: request.data.key,
        baseUrl: uploadServer + 'files/'
      };
    } catch(e) {
      throw new Meteor.Error('bad-request', e.message);
    }
  },
  sitesDeleteFile: function(filePath) {
    check(filePath, String);

    if (!Roles.userHasPermission(this.userId, 'siteFiles.remove')) {
      throw new Meteor.Error('no-permissions', 'The user does not have permissions to remove files');
    }

    try {
      var request = HTTP.del(uploadServer + 'files/' + filePath, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiToken
        }
      }); 
      return request.data;
    } catch(e) {
      throw new Meteor.Error('bad-request', e.message);
    }
  }
});