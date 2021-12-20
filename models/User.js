const { Schema, model } = require('mongoose');

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

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
        
        },
    {
        toJSON: {
          getters: true,
          virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

/* UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
}); */

const User = model('User', UserSchema);

module.exports = User;