'use strict';

module.exports = function(){
  const B2 = require('backblaze-b2');
  const config = require('../config.js');

  // create b2 object instance
  const b2 = new B2({
      accountId: config.storage.accountId,
      applicationKey: config.storage.applicationKey
  });
     
  // authorize with provided credentials
  return b2.authorize().then( () => {
    return {
      addFile: (fileBuffer, name, authorId, authorName) => {
        // get upload url
        return b2.getUploadUrl(config.storage.bucketId).then( res => {
          // upload file
          return b2.uploadFile({
            uploadUrl: res.data.uploadUrl,
            uploadAuthToken: res.data.authorizationToken,
            filename: name,
            data: fileBuffer, // this is expecting a Buffer not an encoded string,
            info: {
              // optional info headers, prepended with X-Bz-Info- when sent, throws error if more than 10 keys set
              // valid characters should be a-z, A-Z and '-', all other characters will cause an error to be thrown
              authorId: authorId,
              authorName: authorName
            }
            // onUploadProgress: function(event) || null // progress monitoring
          }); // returns promise
        });
      }
    };
  });
};

/* backblaze-b2 API using examples

// authorize with provided credentials
return b2.authorize();  // returns promise

// create bucket
b2.createBucket(
  bucketName,
  bucketType // one of `allPublic`, `allPrivate`
);  // returns promise

// delete bucket
b2.deleteBucket(bucketId);  // returns promise

// list buckets
b2.listBuckets();  // returns promise

// update bucket2
b2.updateBucket(bucketId, bucketType);  // returns promise

// get upload url
b2.getUploadUrl(bucketId);  // returns promise

// upload file
b2.uploadFile({
    uploadUrl: 'uploadUrl',
    uploadAuthToken: 'uploadAuthToken',
    filename: 'filename',
    mime: '', // optonal mime type, will default to 'b2/x-auto' if not provided
    data: 'data' // this is expecting a Buffer not an encoded string,
    info: {
        // optional info headers, prepended with X-Bz-Info- when sent, throws error if more than 10 keys set
        // valid characters should be a-z, A-Z and '-', all other characters will cause an error to be thrown
        key1: value
        key2: value
    },
    onUploadProgress: function(event) || null // progress monitoring
});  // returns promise

// list file names
b2.listFileNames({
    bucketId: 'bucketId',
    startFileName: 'startFileName',
    maxFileCount: 100,
    delimiter: '',
    prefix: ''
});  // returns promise

// list file versions
b2.listFileVersions({
    bucketId: 'bucketId',
    startFileName: 'startFileName',
    maxFileCount: 100
});  // returns promise

// hide file
b2.hideFile({
    bucketId: 'bucketId',
    fileName: 'fileName'
});  // returns promise

// get file info
b2.getFileInfo(fileId);  // returns promise

// download file by name
b2.downloadFileByName({
    bucketName: 'bucketName',
    fileName: 'fileName',
    onDownloadProgress: function(event) || null // progress monitoring
});  // returns promise

// download file by fileId
b2.downloadFileById({
  fileId: 'fileId',
  onDownloadProgress: function(event) || null // progress monitoring
});  // returns promise

// delete file version
b2.deleteFileVersion({
    fileId: 'fileId',
    fileName: 'fileName'
});  // returns promise

// start large file
b2.startLargeFile({
  bucketId: 'bucketId',
  fileName: 'fileName'
}) // returns promise

// get upload part url
b2.getUploadPartUrl({
  fileId: 'fileId'
}) // returns promise

// get upload part
b2.uploadPart({
  partNumber: 'partNumber', // A number from 1 to 10000
  uploadUrl: 'uploadUrl',
  uploadAuthToken: 'uploadAuthToken', // comes from getUploadPartUrl();
  data: Buffer // this is expecting a Buffer not an encoded string,
  onUploadProgress: function(event) || null // progress monitoring
}) // returns promise

// finish large file
b2.finishLargeFile({
  fileId: 'fileId',
  partSha1Array: [partSha1Array] // array of sha1 for each part
}) // returns promise

// cancel large file
b2.cancelLargeFile({
  fileId: 'fileId'
}) // returns promise

 */
