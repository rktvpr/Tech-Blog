const  Blog_posts  = require('../models/blog-posts');
const User_data = require('../models/user-data');
const Comment = require('../models/comments')
async function getBlogPosts() {
    return await Blog_posts.findAll({
        attributes: ["id", "title", "content", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "author",
              "created_at",
            ],
            include: {
              model: User_data,
              attributes: ["username"],
            },
          },
        ],
      });
}

async function getBlogPost(req) {
  console.log('post_data',post_data);
    return await Blog_posts.findOne({
        where: {
          id: req.session.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "author",
              "created_at",
            ],
            include: {
              model: User_data,
              attributes: ["username"],
            },
          },
        ],
      });
}

async function createBlogPost(req) {
  console.log('req.body',req.body);
  console.log('req.session', req.session)
    await Blog_posts.create({
        title: req.body.title,
        content: req.body.content,
        author: req.session.user_id,
      });
}

async function updateBlogPost(post_data, id) {
    console.log(post_data)
    await Blog_posts.update({
        title: req.body.title,
        content: req.body.content,
        author: req.session.user_id,
    }, {
        where: req.params.id
    });
}

async function deleteBlogPost(id) {
    await Blog_posts.destroy({
        where: req.params.id
    })
}

module.exports = { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost }