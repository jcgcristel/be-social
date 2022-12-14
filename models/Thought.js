const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            min: [1, 'Character must be between 1-280'],
            max: [280, 'Character must be between 1-280']
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
            getter: true
        }
    }
)

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Character must be between 1-280'],
            max: [280, 'Character must be between 1-280']
        },
        createdAt: { 
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getter: true
        },
        id: false
    }
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;