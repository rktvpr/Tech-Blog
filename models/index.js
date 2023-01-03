const User_data = require('./user-data')
const Blog_posts = require('./blog-posts')

User_data.hasMany(Blog_posts, {
    foreignKey: 'author'
});

Blog_posts.belongsTo(User_data, {
    foreignKey: 'author'
})


module.exports = {User_data, Blog_posts}