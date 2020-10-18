const express = require("express");
const fs  = require("fs");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const Cookie = require('cookie-parser')
const config = require("./config/config");
const router = require('./routes/users');
const front_router = require('./routes/front');
const auth_router = require('./routes/auth')
require('./models/users');

const PORT = process.env.PORT || 4444

const ser = express();

async function start(){
    try {
        await mongoose.connect('mongodb+srv://' + config.mongo_user + ':' + config.mongo_pass + '@cluster0.bxt83.mongodb.net/Users',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connected to MongoDB.");
    } catch (e) {
        fs.appendFile("server.log",e,() => {
            console.log("Error!!!")
        })
    }
}

start();

//ser.use(bodyParser.json())
ser.use(passport.initialize());
require('./config/passport')(passport);
ser.set('view engine', 'pug');

let n15 = require("./Fifteen/fifteen.js");
let n2 = require("./Second/second.js");
let n5 = require("./Five/five.js");


ser.use(express.static( __dirname + '/public'));
ser.use(Cookie());

ser.use((req,res,next) => {
    let today = new Date
    if(today.getDate() == 1 && today.getMonth() == 0 && today.getHours() == 0 && today.getMinutes() == 0 && today.getSeconds() == 0){
        fs.unlink("server.log",() => {
            console.log("Server.log is clear.");
        })
    }
    next()
})

ser.use((req,res,next) => {
    let data = req.method + req.url + req.get("user-agent");
    console.log(data);
    next();
})

ser.use(bodyParser.urlencoded({ extended: false }))
ser.use('/',front_router);
ser.use('/', router);
ser.use('/',auth_router);

ser.use((req, res, next) => {
    res.status(404).render("error",{
        msg: "Page is not found"
    });
    next(new Error("404"))
})

ser.use((err, req, res, next) => {
    let code = res.statusCode;
    if (code == 403 || code == 404 || code == 500) {
        fs.appendFile("server.log", "Error " + res.statusCode + " " + req.method + " " + req.url + " " + req.get("user-agent") + '\n', () => {
        });
    }
})

ser.listen(PORT);
