'use strict';

/**
 * Module dependencies.
 */
var logger = require('mm-node-logger')(module);
var db = require('../config/db')
var _ = require('lodash');

var folders = db.get('folderTree');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function updateFile(req,res)
{
   var id = req.params.folderid;
    
  var folder= folders
  .find({id:id})
  .value();
 
  var newChildNodes = folder.childNodes.map(function(o){
      console.log(o.id)
      if(o.id ==req.params.id )
            o = req.body
        return o;
  });

  var result = folders
  .find({ id: id })
  .assign({ childNodes: newChildNodes})
  .value();

  res.send({folderId: id,file: req.body});  

}

function deleteFile(req,res)
{
var id = req.params.folderid;
    
  var folder= folders
  .find({id:id})
  .value();
 
    var newChildNodes =_.reject(folder.childNodes, function (o) { 
      return o.id == req.params.id;
     });
 
   var deletedobj = _.find(folder.childNodes, function (o) { 
      return o.id == req.params.id;
     });

   var newState = folders
  .find({ id: id })
  .assign({ childNodes: newChildNodes})
  .value();

  

  res.send({folderId: id,file: deletedobj});  
}

function createFile(req,res)
{
   let fileTemplate = {
        id: guid(),
        title: 'New file',
        code: {
        value: 'function(){console.log("Hello")}',
        language: 'javascript'
        }
    };

   var id = req.params.folderid;
    
   var folder= folders
  .find({id:id})
  .value();
 
  console.log(newChildNodes);
    var newChildNodes =folder.childNodes;
    newChildNodes.push(fileTemplate);
   
    console.log(newChildNodes);

    var newState = folders
    .find({ id: id })
  .assign({ childNodes: newChildNodes})
  .value();

  res.send({folderId: id,file: fileTemplate});  
}

module.exports = {
    updateFile:updateFile,
    deleteFile:deleteFile,
    createFile: createFile
};
