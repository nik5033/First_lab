const express = require("express");
const router = express.Router();
const pug = require('pug');

router.get('/login', async (req, res) => {
    res.render("login", {
        title: "Login",
        auth: '/login'
    });
})

router.get('/register', async (req,res) => {
    res.render('register', {
        title: "Registration",
        auth: '/register'
    });
})

module.exports = router;