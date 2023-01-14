const User_data = require('../models/user-data');
const Comment = require("../models/comments")

async function getUsersData() {
    return await User_data.findAll({
        attributes: { exclude: ["[password]"] }
    });
}

async function getUserData() {
    return await User_data.findOne({
        attributes: { exclude: ["[password]"] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content", "created_at"],
            },

            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"],
                },
            },
            {
                model: Post,
                attributes: ["title"],
            },
        ],
    });
}

async function createUserData() {
    await User_data.create({
        username: req.body.username,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    }

async function updateUserData(user_data, id) {
    console.log(user_data)
    await User_data.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
}

async function deleteUserData(id) {
    await User_data.destroy({
        where: reqq.params.id
    })
}

module.exports = { getUsersData, getUserData, createUserData, updateUserData, deleteUserData }