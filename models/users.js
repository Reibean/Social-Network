const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/,
        },
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought'
                }
            ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);

    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

    module.exports = model('User', userSchema);