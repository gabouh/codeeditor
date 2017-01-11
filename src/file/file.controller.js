'use strict';

/**
 * Module dependencies.
 */
var logger = require('mm-node-logger')(module);
var db = require('../config/db')
var _ = require('lodash');

var folders = db.get('folderTree');

function updateFile(req, res) {
  var id = req.params.folderid;

  var folder = folders
    .find({ id: id })
    .value();

  var newChildNodes = folder.childNodes.map(function (o) {
    console.log(o.id)
    if (o.id == req.params.id)
      o = req.body
    return o;
  });

  var result = folders
    .find({ id: id })
    .assign({ childNodes: newChildNodes })
    .value();

  res.send({ folderId: id, file: req.body });

}

function deleteFile(req, res) {
  var id = req.params.folderid;

  var folder = folders
    .find({ id: id })
    .value();

  var newChildNodes = _.reject(folder.childNodes, function (o) {
    return o.id == req.params.id;
  });

  var deletedobj = _.find(folder.childNodes, function (o) {
    return o.id == req.params.id;
  });

  var newState = folders
    .find({ id: id })
    .assign({ childNodes: newChildNodes })
    .value();



  res.send({ folderId: id, file: deletedobj });
}

function createFile(req, res) {
  let fileTemplate = req.body;
  var id = req.params.folderid;
  var folder = folders
    .find({ id: id })
    .value();

  var newChildNodes = folder.childNodes;
  newChildNodes.push(fileTemplate);

  var newState = folders
    .find({ id: id })
    .assign({ childNodes: newChildNodes })
    .value();

  res.send({ folderId: id, file: fileTemplate });
}

module.exports = {
  updateFile: updateFile,
  deleteFile: deleteFile,
  createFile: createFile
};
