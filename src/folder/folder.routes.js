/**
 * Code routes.
 *
 * @author    Naveen Sharma {@link http://_naveen}
 * @copyright Copyright (c) 2015, Naveen Sharma
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var folders = require('./folder.controller.js');

/**
 * Set code routes.
 * 
 * @param {Object} app The express application
 */
function setFolderRoutes(app) {
    app.route('/api/folder').get(folders.getAll);
    app.route('/api/folder').post(folders.createFolder);
    app.route('/api/folder/:id').put(folders.editFolder );
    app.route('/api/folder/:id').delete(folders.deleteFolder);
    
}

module.exports = setFolderRoutes;
