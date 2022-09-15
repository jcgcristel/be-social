const { Schema, model } = require('mongoose');

const Thought  = require('./Thought');

const validateEmail = function(email) {
    var regex = /^([A-z0-9_\.-]+)@([\dA-z\.-]+)\.([A-z\.]{2,6})$/;
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

// Delete dependant thoughts and friends
UserSchema.pre('findOneAndDelete', function(next) {
    User.findById(this.getFilter()["_id"])
    .then(userData => {
        if (!userData) {
            console.log('User not found');
            return;
        }
        Thought.deleteMany({ username: userData.username }).exec();
        return userData;
    })
    // Removes from friends list of users <--- daz big algo :(
    .then(() => {
        User.updateMany({},
            { $pull: { friends: this.getFilter()["_id"] } },
            { multi: true },
        ).exec();
    })
    .then(() => next())
    .catch(e => console.log(e));
});

const User = model('User', UserSchema);

module.exports = User;