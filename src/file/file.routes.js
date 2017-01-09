'use strict';

/**
 * Module dependencies.
 */
var files = require('./file.controller.js');




function setFileRoutes(app) {
      app.route('/api/file/:folderid/:id').put(files.updateFile);
      app.route('/api/file/:folderid/:id').delete(files.deleteFile);
      app.route('/api/file/:folderid').post(files.createFile);
 }

module.exports = setFileRoutes;