/**
 * Home routes.
 *
 * @author    Naveen Sharma {@link http://_naveen}
 * @copyright Copyright (c) 2015, Naveen Sharma
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var home = require('./home.controller.js');

/**
 * Set home routes.
 * 
 * @param {Object} app The express application
 */
function setUserRoutes(app) {
    app.route('/').get(home.home);
    app.route('/view').get(home.home2);
    app.route('/edit').get(home.home2);
}

module.exports = setUserRoutes;
