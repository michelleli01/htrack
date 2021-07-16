const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.send({success: false, message: "Account doesn't exist"});
        else{
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({success: true, message: "Successfully logged in"});
                console.log(req.user);
            });
        }
    })(req, res, next);
});

router.post("/signup", (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.send({success: false, message: "Please enter all fields"});
    }

    if(password.length < 6){
        res.send({success: false, message: "Password must be at least 6 characters"});
    }
    else{
        User.findOne({ email: email })
        .then(user => {
            if(user){
                res.send({success: false, message: "Email already exists"});
            }
            else{
                const newUser = new User({
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.log(err.message);
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(user => {
                            res.send({success: true, message: "Account successfully created"})
                        })
                        .catch(err => console.log(err.message));
                    });
                });
            }
        });
    }
});

router.get('/forgot-password', (req, res) => {
    User.findOne({ email: email })
    .then(user => {
        
    })
})

router.get('/logout', function(req, res){
    req.logout()
});

module.exports = router;