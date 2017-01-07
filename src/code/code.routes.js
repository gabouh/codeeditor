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
var code = require('./code.controller.js');

/**
 * Set code routes.
 * 
 * @param {Object} app The express application
 */
function setCodeRoutes(app) {
    app.route('/code').get(code.getAll);
    app.route('/code').post(code.createFolder);
    
}

module.exports = setCodeRoutes;
