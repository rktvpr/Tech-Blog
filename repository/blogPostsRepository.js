const  Blog_posts  = require('../models/blog-posts');

async function getBlogPosts() {
    return await Blog_posts.findAll();
}

async function getBlogPost(id) {
    return await Blog_posts.findByPk(id);
}

async function createBlogPost(blog_posts) {
    await Blog_posts.create(blog_posts);
}

async function updateBlogPost(post_data, id) {
    console.log(post_data)
    await Blog_posts.update({
        post_data: post_data
    }, {
        where: { id: id }
    });
}

async function deleteBlogPost(id) {
    await Blog_posts.destroy({
        where: { id: id }
    })
}

module.exports = { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost }