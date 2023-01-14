const Comment = require("../models/comments")

async function getComments() {
    await Comment.findAll({});
}

async function getComment() {
    await Comment.findAll({
        where: {
            id: req.params.id,
        },
    });
}
async function createComment() {
    await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    });
}

async function updateComment() {
    await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    })
}

async function deleteComment() {
await Comment.destroy({
    where: {
        id: req.params.id,
    },
})
}

module.exports = { getComments, getComment, createComment, updateComment, deleteComment }