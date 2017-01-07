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


/**
 * Find an user by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the user corresponding to the specified id
 * 
 */
function home(req, res) {
    //res.send('Hello World!')
    res.redirect('/home');
}
function home2(req, res) {
    //res.send('Hello Home!')
    res.sendfile('app/index.html');
}


module.exports = {
    home: home,
    home2: home2
};
