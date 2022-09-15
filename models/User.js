const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email);
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Email invalid']
    },
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true
    }
})


// Total friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;