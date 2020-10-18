const express = require("express");
const passport = require('passport')
const router = express.Router();
const pug = require('pug');

let n15 = require("../Fifteen/fifteen.js");
let n2 = require("../Second/second.js");
let n5 = require("../Five/five.js");

router.get('/',(req, res) => {
    res.render('main', {
        title: 'Main page',
        numbers: [2, 5, 15]});
})

router.get('/api/GudkovNikita/lab1/2',passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), (req, res) => {
    if(req.query.Array == null) {
        res.render("task2", {
            title: "Task 2",
            msg: "Input your array",
            input: "Array"
        })
    }
    else {
        let array = (req.query.Array).split(",");
        res.render("ans2", {
            title: "Task 2",
            text: "Combinations: ",
            answer: n2.all_combinations(array).join(":")
        })
    }
})

router.get('/api/GudkovNikita/lab1/5', (req, res) => {
    if(req.query.String == null) {
        res.render("task5", {
            title: "Task 5",
            msg: "Input your string",
            input: "String"
        })
    }
    else {
        res.render("ans5", {
            title: "Task 5",
            text: "The longest word in string is",
            answer: n5.Find(req.query.String)
        })
    }
})

router.get('/api/GudkovNikita/lab1/15', passport.authenticate('jwt',{session: false, failureRedirect: '/login'}), (req, res) =>{
    if(req.query.Email == null) {
        res.render("task15", {
            title: "Task 15",
            msg: "Input your email",
            input: "Email"
        })
    }
    else {
        res.render("ans15", {
            title: "Task 15",
            text: "Email is",
            answer: n15.check_email(req.query.Email)
        })
    }
})

module.exports = router;