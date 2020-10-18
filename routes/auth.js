const bcrypt = require('bcryptjs');
const express = require("express");
const jwt = require('jsonwebtoken');
const pug = require('pug');
const User = require('../models/users');
const key = require('../config/config');
const router = express.Router();


router.post('/login', async (req,res) => {
    let Candidate = await User.findOne({login: req.body.login});

    if(Candidate){
        let truePasswd = bcrypt.compareSync(req.body.password, Candidate.password);
        if(truePasswd){
            let token = jwt.sign({
                login: Candidate.login,
                id: Candidate._id
            }, key.jwt, {expiresIn:3600*3});
            /*res.status(200).json({
                token: token
            })*/
            res.cookie('jwt', token, {maxAge:9000}).redirect('/');
        } else {
            res.status(401).render("error", {
                msg: "Password is not correct"
            })
        }
    } else {
        res.status(404).render("error",{
            msg: "User is not exist"
        })
    }
});

router.post('/register', async (req, res) => {
    let Candidate = await User.findOne({login: req.body.login});

    if(Candidate){
        res.status(404).render("error",{
            msg: " User \"" + req.body.login +  "\" already exists."
        })
    }
    else{
        let salt = bcrypt.genSaltSync(10);
        let password = req.body.password;
        let user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
        } catch(e){
            res.status(404).render('error',{
                msg: "Something wrong"
            });
        }
    }
    res.redirect('/')
})

module.exports = router;