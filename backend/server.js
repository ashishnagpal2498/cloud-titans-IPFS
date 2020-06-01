const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const passport = require('./passport').passport;
const mongoDB = require('./model');
mongoDB.connectToServer((err) => { if(err) console.error('Error',err)})
const routes = {
    signup: require('./api/signup').route,
    login: require('./api/login').route
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(expressSession({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login',routes.login);
app.use('/signup',routes.signup);


app.listen(2222,()=>{
    console.log('server has started at http://localhost:2222');
})