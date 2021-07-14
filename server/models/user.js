const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.methods.comparePassword = function (password, callback){
    bcrypt.compare(password, this.password, callback)
}

UserSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified("password")) return next();
    return bcrypt.genSalt((salt_error, salt) => {
        if(salt_error){
            return next(salt_error);
        }
        return bcrypt.hash(user.password, salt, (hash_error, hash) => {
            if(hash_error){
                return next(hash_error);
            }

            user.password = hash;
            return next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);