const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const passport = require('./passport').passport;
const mongoDB = require('./model');
mongoDB.connectToServer((err) => { if(err) console.error('Error',err)})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(expressSession({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

const routes = {
    signup: require('./api/signup').route,
    login: require('./api/login').route,
    upload:  require('./api/upload').route,
    file: require('./api/files').route
};

app.use('/login',routes.login);
app.use('/signup',routes.signup);
app.use('/upload',routes.upload);
app.use('/file',routes.file);

app.use((req,res)=> {
    res.status(404).send({
        error:true,
        message:"Path not found"
    })
})

app.listen(2222,()=>{
    console.log('server has started at http://localhost:2222');
})