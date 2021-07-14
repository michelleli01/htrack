const express = require('express');
const passport = require('passport');
const router = express.Router();
const validator = require('validator');

router.post('/signup', (req, res, next)=>{
    const result = validateSignupForm(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            messaage: result.message,
            error: result.error
        });
    }

    return passport.authenticate('local-signup', (err) => {
		if (err) {
			console.log("[SERVER] " + err);
			if (err.name === 'MongoError' && err.code === 11000) {
				// the 11000 Mongo code is for a duplication phone number error
				// the 409 HTTP status code is for conflict error
				return res.status(409).json({
					success: false,
					message: "Check the form for errors.",
					error: "This email already has an account associated with it."
				});
			}

			return res.status(500).json({
				success: false,
				message: "Could not process the form."
			});
		}

		return res.status(200).json({
			success: true,
			message: "You have successfully signed up and created an account!"
		});
	})(req, res, next);
});

router.post('/login', (req, res, next) => {
    const result = validateLoginForm(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            message: result.message, 
            error: result.error
        });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if(err){
            if(err.name === "IncorrectCredentialsError"){
                console.log("[SERVER] " + "IncorrectCredentialsError")
                return res.status(400).json({
                    success: false, 
                    message: err.messaage
                });
            }

            return res.status(500).json({
                success: false, 
                message: "Could not process form"
            });
        }

        return res.json({
            success: true, 
            message: "Successfully logged in!", 
            token,
            user: userData
        });
    })(req, res, next);
});

function validateSignupForm(body){
    const error = "";
    const isValid = true;
    const message = "Please review sign up form"

    if(!body || typeof body.email !== "string" || !validator.isEmail(body.email)){
        isValid = false;
        error = "Please provide a valid email";
    }

    if(!body || typeof body.password !== "string" || body.password.length < 8){
        isValid = false;
        error = "Please provide a password that is at least 8 characters long";
    }

    return {
        success: isValid,
        message, 
        error
    };
}

function validateLoginForm(body){
    const error = "";
    const isValid = true;
    const message = "Please review login form"

    if(!body || typeof body.email !== "string" || body.email.trim().length === 0){
        isValid = false;
        error = "Please provide an email";
    }

    if(!body || typeof body.password !== "string" || body.password.trim().length === 0){
        isValid = false;
        error = "Please provide a password";
    }

    return {
        success: isValid, 
        message, 
        error
    }
}

module.exports=router;