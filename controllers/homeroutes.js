const sequelize = require("sequelize")
const { User_data, Blog_posts, Comment } = require("../models")
const router = require("express").Router()

//gets and renders posts on the homepage
router.get('/', async (req, res) => {
    try {
        const blogPostData = await Blog_posts.findAll({
            attributes: ["id", "title", "content"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                        // "created_at",
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
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

//redirects to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

//redirects to signup page
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("signup");
  });

  // .get to pull data for a single post as well as renders the post on homepage
  router.get("/post/:id", async (req, res) => {
    try {
      const blogPostData = await Blog_posts.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
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
  
      if (!blogPostData) {
        res.status(404).json({ message: "No blog post found with this id!" });
        return;
      }
      const post = blogPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // .get to pull data for post comments and render the comments on homepage
  router.get("/posts-comments", async (req, res) => {
 
    try {
      const blogPostData = await Blog_posts.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
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


      if (!blogPostData) {
        res.status(404).json({ message: "No blog post found with this id!" });
        return;
      }
      const post = blogPostData.get({ plain: true });

      res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});

module.exports = router
