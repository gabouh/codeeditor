const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')
const db = require('./db');
function createAppState(cb){
   
   // Init
    db.defaults({ restartLog: [] })
            .value();

     var posts = db.get('restartLog')
     const post = posts
    .push(new Date())
    .last()
    .value()

   if(cb && typeof(cb) === 'function') {
       
       cb();
    }

    
}

module.exports = createAppState;