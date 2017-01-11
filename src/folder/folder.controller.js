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

const posts = db.get('folderTree')

function getAll(req, res) {

    res.send(posts)
}
function getById(req, res) {
    res.send('getById!')

}

function createFolder(req, res) {
    const post = posts
        .push(req.body)
        .last()
        .value()

    res.send(post);
}

function editFolder(req, res) {
    var id = req.params.id;

    var result = posts
        .find({ id: id })
        .assign({ title: req.body.title })
        .value();


    if (result)
        res.send(result);
    else {
        res.statusCode = 404;
        res.send('folder not found');
    }
}

function deleteFolder(req, res) {
    var id = req.params.id;

    var post = posts
        .remove({ id: id })
        .value();

    if (post.length > 0)
        res.send(post[0]);
    else {
        res.statusCode = 404;
        res.send('folder not found');
    }

}
module.exports = {
    getAll: getAll,
    getById: getById,
    createFolder: createFolder,
    editFolder: editFolder,
    deleteFolder: deleteFolder
};
