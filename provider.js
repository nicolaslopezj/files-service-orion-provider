orion.filesystem.providerUpload = function(options, success, failure, progress) {
  if (!Roles.userHasPermission(Meteor.userId(), 'siteFiles.upload')) {
    failure(new Meteor.Error('no-permissions', 'The user does not have permissions to upload files'))
    return;
  }

  Meteor.call('sitesRequestUploadKey', function(error, result) {
    if (error) {
      failure(error);
    } else {
      var formData = new FormData();
      formData.append('file', options.fileList[0]); 

      $.ajax({
        url: result.url,
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
          if(!data.path){
            failure(new Meteor.Error('upload-error', 'Error uploading file'));
            return;
          }
          success(result.baseUrl + data.path, { filePath: data.path });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          failure(new Meteor.Error('upload-error', 'Error uploading file'));
        }
      });
    }
  })
}

orion.filesystem.providerRemove = function(file, success, failure)  {
  if (!Roles.userHasPermission(Meteor.userId(), 'siteFiles.remove')) {
    failure(new Meteor.Error('no-permissions', 'The user does not have permissions to remove files'))
    return;
  }

  Meteor.call('sitesDeleteFile', file.meta.filePath, function(error, result) {
    if (error) {
      failure(error);
    } else {
      success();
    }
  });
}