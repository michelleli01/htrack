const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
const PORT = 8080;

mongoose.connect(
    "mongodb+srv://michelleli:denhop1009@users.ecemm.mongodb.net/node-auth",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    },
    () => {
        console.log("mongoose is connected");
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport_config')(passport);

app.post('/auth/login', (req, res, next)=>{
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

app.post("/auth/signup", (req,res) => {
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

app.get('/auth/logout', function(req, res){
    req.logout()
});

app.get('/auth/user', function(req, res){
    res.send(req.user);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;