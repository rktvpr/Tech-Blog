const router = require('express').Router();
const userDataRoute = require('./user-data-routes')
const blogPostsRoute = require('./blog-posts-routes')
router.use("/user-data", userDataRoute)
router.use("/blog-posts", blogPostsRoute)
module.exports = router