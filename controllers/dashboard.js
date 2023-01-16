const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User_data, Comment, Blog_posts } = require("../models");
const withAuth = require("../utils/auth");

//fetches user data along with posts and comment data and renders to dashboard
router.get("/", async (req, res) => {
    console.log(req.session);
    try {
        const blogPostData = await Blog_posts.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "content"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                    ],
                    include: {
                        model: User_data,
                        attributes: ["username"],
                    },
                },
                {
                    model: User_data,
                    attributes: ["username"],
                },
            ],
        });

        const posts = blogPostData.map(post => post.get({ plain: true }));

        res.render("dashboard", { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//allows user to edit post through dashboard
router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const blogPostData = await Blog_posts.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "title", "content"],
            include: [
                {
                    model: User_data,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                    ],
                    include: {
                        model: User_data,
                        attributes: ["username"],
                    },
                },
            ],
        });

        if (!blogPostData) {
            res.status(404).json({ message: "No blog post found with this id!" });
            return;
        }

        const post = blogPostData.get({ plain: true });
        res.render("edit-post", { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//renders new post to dashboard
router.get("/new", (req, res) => {
    res.render("new-post", { loggedIn: true });
  });

module.exports = router