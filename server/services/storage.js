'use strict';

module.exports = function(){
  const b2 = require('./backblaze.js');

  return b2().then( storage => {
    return {
      addFile: (fileBuffer, name, authorId, authorName) => {
        storage.addFile(fileBuffer, name, authorId, authorName)
      }
    };
  });
};