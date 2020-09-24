const express = require("express");
const ser = express();

let n15 = require("./Fifteen/fifteen.js");
let n2 = require("./Second/second.js");
let n5 = require("./Five/five.js");

ser.get('/',function (request, response){
    response.send('<h1>Welcome</h1>');
})

ser.get('/api/GudkovNikita/lab1/2',function (request, response){
    let array = (request.query.Array).split(",");
    response.send(n2.all_combinations(array));
})

ser.get('/api/GudkovNikita/lab1/5',function (request, response){
    response.send(n5.Find(request.query.String));
})

ser.get('/api/GudkovNikita/lab1/15',function (request, response){
    response.send("Email is " + n15.check_email(request.query.Email))
})

ser.listen(4444);