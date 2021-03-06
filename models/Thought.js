const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,

        },
        username: {
            type: String,
            required: true
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

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'Share your thoughts with us.',
            //must be within 1-280 characters in length
            validate: [({ length }) => length >= 1 || length <= 280, 'Thoughts should be between 1-280 characters.']
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
        },
        id: true
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;