/**
 * User controller.
 *
 * @author    Naveen Sharma {@link http://_naveen}
 * @copyright Copyright (c) 2015, Naveen Sharma
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('mm-node-logger')(module);
var db = require('../config/db')

/**
 * Find an user by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the user corresponding to the specified id
 * 
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const posts = db.get('folderTree')

function getAll(req, res) {
   
    res.send(posts)
}
function getById(req, res) {
    res.send('getById!')
   
}

function createFolder(req,res)
{
    let fileTemplate = {
        id: guid(),
        title: 'New file',
        code: {
        value: 'function(){console.log("Hello")}',
        language: 'javascript'
        }
    };
    let folderTemplate = {
        id: guid(),
        title: 'New folder',
        childNodes: [fileTemplate]
    };

     const post = posts
    .push(folderTemplate)
    .last()
    .value()

    res.send(post);
}

function editFolder(req,res)
{
   var id = req.params.id;

   var result = posts
  .find({ id: id })
  .assign({ title: req.body.title})
  .value();

  
 if(result)
    res.send(result);
  else
  {
      res.statusCode = 404;
      res.send('folder not found');
  }
}

function deleteFolder(req,res)
{
    var id = req.params.id;
    
  var post= posts
  .remove({ id: id })
  .value();

  if(post.length >0)
    res.send(post[0]);
  else
  {
      res.statusCode = 404;
      res.send('folder not found');
  }

}
module.exports = {
    getAll:  getAll,
    getById: getById,
    createFolder : createFolder,
    editFolder : editFolder,
    deleteFolder:deleteFolder
};
