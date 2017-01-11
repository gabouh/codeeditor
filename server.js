
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

// // Request body parsing middleware should be above methodOverride
// app.use(bodyParser.urlencoded({
//         extended: true
//     }));
// app.use(bodyParser.json());
// app.use(methodOverride());

// app.use(express.static('app'));

// app.get('/', function (req, res) {
//  res.sendfile(__dirname + '/app/index.html');
// })



// var httpServer = app.listen(8000, function () {
//   console.log('Example app listening on port 8000!')
// });

// var io = require('socket.io')(httpServer);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

/**
 * @author    Naveen Sharma {@link http://_naveen}
 * @copyright Copyright (c) 2015, Naveen Sharma
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */


'use strict';

/**
 * Module dependencies.
 */
var colors = require('colors');
var logger = require('mm-node-logger')(module);
var pkg = require('./package.json');
var config = require('./src/config/config');
var express = require('./src/config/express');
//var mongodb = require('./src/config/mongoose');
var appState = require('./src/config/appstate');
var SocketIo = require('socket.io');

// Initialize appState
appState(function startServer() {
  console.log("Ready to create");
  // Initialize express
  var app = express.init();

  // Start up the server on the port specified in the config after we connected to mongodb
 var server =  app.listen(config.server.port, function () {
    var serverBanner = ['',
      '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
      '*',
      '* ' + pkg.description,
      '* @version ' + pkg.version,
      '* @author ' + pkg.author.name,
      '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author.name,

      '*',
      '*' + ' App started on port: '.green + config.server.port + ' - with environment: '.green + config.environment.green,
      '*',
      '*************************************************************************************************',
      ''].join('\n');
    logger.info(serverBanner);
  });

 const io = new SocketIo(server, {path: '/api/codeeditor'});
 const socketEvents = require('./socketEvents')(io);
  // '* @license ' + pkg.license.type + ', ' + pkg.license.url,
  // 
  module.exports = app;
});
