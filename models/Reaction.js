const { Schema, model, Types } = require('mongoose');

const Reaction = new Schema (
    {
        reactionId: {
            
        },
        reactionBody: {
            type: String,
            required: true,
            
        },
        username: {
            type: String,
            required: 'Please enter username.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
        }
    }
)