/**
 * Populate DB with sample data on server start to disable, edit config.js, and set `seedDB: false`
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
var mongoose = require('mongoose');
var User = require('../user/user.model');
var Image = require('../image/image.model');
var Crop = require('../crop/crop.model');
var State = require('../states/states.model');


var testUserId = mongoose.Types.ObjectId();

/*User.find({}).remove(function() {
    User.create({
            provider: 'local',
            name: 'Naveen Sharma',
            email: 'martinmicunda@test.com',
            password: 'test',
            avatar: 'https://avatars2.githubusercontent.com/u/1643606?v=3'
        }, {
            _id: testUserId,
            provider: 'local',
            name: 'Test',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function() {
            logger.info('Finished populating users');
        }
    );
});

Image.find({}).remove(function() {
    Image.create({
        fileName : 'Slovakia 1',
        url : 'http://www.rocketroute.com/wp-content/uploads/Carpathian-mountains-Slovakia-685x458.jpg?125416',
        user: testUserId
    }, {
        fileName : 'Slovakia 2',
        url : 'http://www.travelslovakia.sk/images/blog/small-group-tours/tatra-mountains-self-guided.jpg?125416',
        user: testUserId
    }, {
        fileName : 'Slovakia 3',
        url : 'http://www.travelslovakia.sk/images/day-tours/high-tatras.jpg?125416',
        user: testUserId
    }, function() {
        logger.info('Finished populating images');
    });
});
*/


var states = State.find({}).count().exec();
states.then(function(count) {
    //console.log(count);
    if (count == 0) {
         console.log("Seed State Started");
         State.create(statesList).then(function() {
            logger.info('Finished populating states');
        },function(err){
             logger.error(err);
        });
    }

});


var statesList = [
  {
    "_id": "579b943f44c0110f9a315b57",
    "Name": "JHARKHAND"
  },
  {
    "_id": "579b943f44c0110f9a315b58",
    "Name": "UTTARANCHAL"
  },
  {
    "_id": "579b943f44c0110f9a315b59",
    "Name": "CHHATTISGARH"
  },
  {
    "_id": "579b943f44c0110f9a315b5a",
    "Name": "A & N ISLANDS"
  },
  {
    "_id": "579b943f44c0110f9a315b5b",
    "Name": "UTTAR PRADESH"
  },
  {
    "_id": "579b943f44c0110f9a315b5c",
    "Name": "PONDICHERRY"
  },
  {
    "_id": "579b943f44c0110f9a315b5d",
    "Name": "NAGALAND"
  },
  {
    "_id": "579b943f44c0110f9a315b5e",
    "Name": "MAHARASHTRA"
  },
  {
    "_id": "579b943f44c0110f9a315b5f",
    "Name": "GUJARAT"
  },
  {
    "_id": "579b943f44c0110f9a315b60",
    "Name": "ASSAM"
  },
  {
    "_id": "579b943f44c0110f9a315b61",
    "Name": "GOA"
  },
  {
    "_id": "579b943f44c0110f9a315b62",
    "Name": "MEGHALYA"
  },
  {
    "_id": "579b943f44c0110f9a315b63",
    "Name": "ORISSA"
  },
  {
    "_id": "579b943f44c0110f9a315b64",
    "Name": "DELHI"
  },
  {
    "_id": "579b943f44c0110f9a315b65",
    "Name": "ANDHRA PRADESH"
  },
  {
    "_id": "579b943f44c0110f9a315b66",
    "Name": "TRIPURA"
  },
  {
    "_id": "579b943f44c0110f9a315b67",
    "Name": "HARYANA"
  },
  {
    "_id": "579b943f44c0110f9a315b68",
    "Name": "RAJASTHAN"
  },
  {
    "_id": "579b943f44c0110f9a315b69",
    "Name": "PUNJAB"
  },
  {
    "_id": "579b943f44c0110f9a315b6a",
    "Name": "WEST BENGAL"
  },
  {
    "_id": "579b943f44c0110f9a315b6b",
    "Name": "CHANDIGARH"
  },
  {
    "_id": "579b943f44c0110f9a315b6c",
    "Name": "ARUNACHAL PRADESH"
  },
  {
    "_id": "579b943f44c0110f9a315b6d",
    "Name": "TAMIL NADU"
  },
  {
    "_id": "579b943f44c0110f9a315b6e",
    "Name": "BIHAR"
  },
  {
    "_id": "579b943f44c0110f9a315b6f",
    "Name": "KERALA"
  },
  {
    "_id": "579b943f44c0110f9a315b70",
    "Name": "HIMACHAL PRADESH"
  },
  {
    "_id": "579b943f44c0110f9a315b71",
    "Name": "SIKKIM"
  },
  {
    "_id": "579b943f44c0110f9a315b72",
    "Name": "MIZORAM"
  },
  {
    "_id": "579b943f44c0110f9a315b73",
    "Name": "KARNATAKA"
  },
  {
    "_id": "579b943f44c0110f9a315b74",
    "Name": "D & N HAVELI"
  },
  {
    "_id": "579b943f44c0110f9a315b75",
    "Name": "JAMMU & KASHMIR"
  },
  {
    "_id": "579b943f44c0110f9a315b76",
    "Name": "MANIPUR"
  },
  {
    "_id": "579b943f44c0110f9a315b77",
    "Name": "MADHYA PRADESH"
  }
]