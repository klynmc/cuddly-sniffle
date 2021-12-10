const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter username.',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter your email address!',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.']
        },
        thoughts: {

        },
        friends: {

        }
    }
);

const friendCount = new Schema (
    {

    }
);

const User = model('User', UserSchema);

module.exports = User;