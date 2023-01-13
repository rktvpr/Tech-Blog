const sequelize = require("sequelize")
const {User_data, Blog_posts} = require("../models")
const router = require("express").Router()


router.get('/', (req, res) => {
    res.render('homepage')
})


module.exports = router
