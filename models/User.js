const { Schema, model } = require('mongoose');

const Thought  = require('./Thought');

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
    },
    id: false
})


// Total friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Delete dependant thoughts
UserSchema.pre('findOneAndDelete', function(next) {
    User.findById(this.getFilter()["_id"])
    .then(userData => {
        if (!userData) {
            console.log('User not found');
            return;
        }
        return Thought.deleteMany({ username: userData.username }).exec();
    })
    .then(() => {next()})
    .catch(e => console.log(e));
});

const User = model('User', UserSchema);

module.exports = User;