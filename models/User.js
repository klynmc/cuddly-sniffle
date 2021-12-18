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
        thoughts: [],

        friends: []
    },
    {
        toJSON: {
          getters: true,
          virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount', 'thoughtCount').get(function() {
    return this.friends.length, this.thoughts.length;
});

const User = model('User', UserSchema);

module.exports = User;