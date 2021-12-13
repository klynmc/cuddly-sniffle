const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'Share your thoughts with us.',

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Please enter username.'
        },
        // reactions are like replies in pizza-hunt
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          getters: true,
          virtuals: true
        }
    }
);

const ReactionSchema = new Schema (
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
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;