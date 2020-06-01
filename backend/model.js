const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const uri = "mongodb://localhost:27017/db";
const {objectGenerator,messages} = require('./utils');
const saltRounds = 10;
const bcrypyt = require('bcrypt');

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
    User: {
          add: async function (userObj,password){
              let user = _db.collection('users');
              let userObject = await user.insertOne(userObj)
                  .then((result) => {
                      return result.ops[0];
                  }).catch((err) => err);
              return await this.Password.add(userObject._id,password)
          },
          find: async function(userInput,passInput){
              // Arrow function aren't used because of this binding -
              let user = _db.collection('users');
              console.log('User input', userInput)
              return new Promise((resolve,reject)=>{
                  user.find({
                      email: userInput
                  }).toArray(async (err,result) => {
                      console.log(result[0]);
                      if(err)  reject(err);
                      resolve(this.Password.find(result[0]._id,passInput));
                  });
              })

          },
            findById : async (userId) => {
                let user = _db.collection('users');
                return await user.find({_id: mongodb.ObjectID(userId)}).toArray((err,res)=>{
                  if(err) return err;
                  return res;
              })
            },
        Password: {
            add: async (userId,pass) => {
                let password = _db.collection('password');
                let passwordHash = await bcrypyt.hash(pass,saltRounds);
                return new Promise((resolve,reject) => {
                    password.insertOne({
                        userId:userId,
                        password: passwordHash
                    }).then((result) => resolve(objectGenerator(null,result.insertedId,messages("s","User"))))
                        .catch((err) => reject(objectGenerator(true,err,messages("f","Server"))));
                })
            },
            find: async (userId,passInput) => {
                let password = _db.collection('password')
                     return new Promise((resolve,reject) => {
                         password.find({
                             userId
                         }).toArray(function (err, result) {
                             if (err) reject(err);
                             console.log('password -- ')
                             bcrypyt.compare(passInput, result[0].password)
                                 .then((result1) => {
                                     if (result1 === true)
                                         resolve(objectGenerator(null, result[0], messages("s", "Found")));
                                     else reject(objectGenerator(null, [], "Invalid Email/Password"))
                                 })
                         })
                     })
            }
        }
    },

};