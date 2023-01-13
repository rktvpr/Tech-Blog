const User_data = require('./user-data')
const Blog_posts = require('./blog-posts')
const Comment = require('./comments')

User_data.hasMany(Blog_posts, {
    foreignKey: 'author'
});

Blog_posts.belongsTo(User_data, {
    foreignKey: 'author'
})

Comment.belongsTo(User_data, {
    foreignKey: "user_id",
    onDelete: "cascade",
});

Comment.belongsTo(Blog_posts, {
    foreignKey: "post_id",
    onDelete: "cascade",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "cascade",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "cascade",
});

module.exports = { User_data, Blog_posts, Comment }