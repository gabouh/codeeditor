const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')

// module.exports.db = (function(){
//     var db;
//     return (function(){

//         if(db=== undefined || db === null)
//         {
//             db = low('db.json', {
//             storage: fileAsync
//              });

//             // Init
//             db.defaults({ posts: [] })
//             .value()
//          }
//          return db;
//     })

// })();


var DB = (function () {
    var instance;
 
    function createInstance() {
         var db = low('db.json', {
            storage: fileAsync
             });

        return db;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },


    };
})();

module.exports= DB.getInstance();