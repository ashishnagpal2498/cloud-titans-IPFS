const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const uri = "mongodb://localhost:27017/db";
let _db;
module.exports = {
    connectToServer: function( callback ) {
        MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
            _db  = client.db('mernApp');
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    },
    User: function () {
      return _db.collection('users')
    }
};
