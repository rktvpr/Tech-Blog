const { User_data } = require("../models");

const userData = [
  {
    username: "RKTVPR",
    password: "ABC12345",
  },
  {
    username: "Kai_vxk",
    password: "Kaneki0000",
  },
];

const seedUsers = () => User_data.bulkCreate(userData);

module.exports = seedUsers;