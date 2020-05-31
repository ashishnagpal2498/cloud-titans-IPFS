const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
const uri = "mongodb://localhost:27017/db"
const client = new mongoClient.connect(uri,{useNewUrlParser:true})

let User,Password,Files;

client.connect(err => {
    console.error(err);
    User = client.db('mernApp').collection('users');
    Password = client.db('mernApp').collection('password');
    Files = client.db('mernApp').collection('files');
})

exports = module.exports = {
   User,Password,Files
}