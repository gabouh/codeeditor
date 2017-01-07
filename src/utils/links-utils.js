'use strict';

var config  = require('../config/config');

function Link(req, route, params) {

   // console.log(req, route, params);

    var protocol = req.protocol;
    var host = req.hostname;
  
    var urlparam = Object.keys(params).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');

    var result = protocol + '://'+ host+':'+config.server.port+'/api/'+ route + '?' + urlparam;
   // console.log(result);
    return  result;

}

exports.creatLink= Link;
