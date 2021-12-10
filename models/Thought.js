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
        reactions: []
    },
    {
        toJSON: {
          getters: true
        }
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;