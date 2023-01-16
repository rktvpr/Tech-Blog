const router = require('express').Router();
const userDataRoute = require('./user-data-routes')
const blogPostsRoute = require('./blog-posts-routes')
const commentRoutes = require('./comment-routes')

router.use("/comments", commentRoutes)
router.use("/user-data", userDataRoute)
router.use("/blog-posts", blogPostsRoute)
module.exports = router