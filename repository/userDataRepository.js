const  User_data  = require('../models/user-data');

async function getUsersData() {
    return await User_data.findAll();
}

async function getUserData(id) {
    return await User_data.findByPk(id);
}

async function createUserData(user_data) {
    await User_data.create(user_data);
}

async function updateUserData(user_data, id) {
    console.log(user_data)
    await User_data.update({
        username: user_data.username,
        pword: user_data.pword,
    }, {
        where: { id: id }
    });
}

async function deleteUserData(id) {
    await User_data.destroy({
        where: { id: id }
    })
}

module.exports = { getUsersData, getUserData, createUserData, updateUserData, deleteUserData }