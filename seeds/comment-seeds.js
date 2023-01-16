const { Comment } = require('../models');

const commentData = [{
        comment_text: "This was very useful.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Interesting take on this!",
        user_id: 1,
        post_id: 2
    },
    {
        comment_text: "Good job!",
        user_id: 2,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;