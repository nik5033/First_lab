const express = require("express");
const fs  = require("fs");
const ser = express();

let n15 = require("./Fifteen/fifteen.js");
let n2 = require("./Second/second.js");
let n5 = require("./Five/five.js");

ser.use((req,res,next) => {
    let data = req.method + req.url + req.get("user-agent");
    console.log(data);
    next();
})

ser.get('/',(request, response) => {
    response.send('<h1>Welcome</h1>');
})

ser.get('/api/GudkovNikita/lab1/2', Auth, (request, response) => {
    let array = (request.query.Array).split(",");
    response.send(n2.all_combinations(array));
})

ser.get('/api/GudkovNikita/lab1/5', (request, response) => {
    response.send(n5.Find(request.query.String));
})

ser.get('/api/GudkovNikita/lab1/15', Auth, (request, response) =>{
    response.send("Email is " + n15.check_email(request.query.Email));

})

function Auth(req, res, next){
    if(req.query.login == "admin" && req.query.passwd == "admin"){
        next();
    }
    else{
        res.status(403).send("Fuck you leatherman");
        next(new Error("403"))
    }
}

ser.use((req, res, next) => {
    res.status(404).send("Page is not found");
    next(new Error("404"))
})

ser.use((err, req, res, next) => {
    fs.appendFile("server.log", "Error " + res.statusCode + " " + req.method + " " + req.url + " " + req.get("user-agent") + '\n',() => {});
})

ser.listen(4444);
