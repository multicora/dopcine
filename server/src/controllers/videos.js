'use strict';

const uuid = require('node-uuid');
const separator = '_';
const keys = require('../responseKeys.js');

module.exports = function (DAL) {

  return {
    addVideo: (video) => {
      const file = video.file;
      const metadata = Object.assign({}, video);
      delete metadata.file;

      return require('../services/storage.js')(DAL).then( storage => {
        const id = uuid.v1();
        const newName = id + separator + file.hapi.filename;

        return storage.addFile(file._data, newName);
      }).then((response) => {
        return !response.data.fileId ? Promise.reject({
          key: keys.GENERAL.SOMETHING_WENT_WRONG,
          type: 500
        }) : Promise.resolve(response.data.fileName);
      }).then((fileName) => {
        metadata.name = fileName;
        return DAL.videos.create(metadata);
      });
    }
  };
};
