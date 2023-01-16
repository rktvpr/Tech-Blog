const router = require('express').Router();
const { User_data } = require('../../models');
const { getUsersData, getUserData, createUserData, updateUserData, deleteUserData } = require("../../repository/userDataRepository")
const withAuth = require("../../utils/auth");

//gets all user data
router.get('/', async (req, res) => {
  try {
    const UserData = await getUsersData();
    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//gets single users data
router.get('/:id', async (req, res) => {
  try {
    const userDataById = await getUserData(req.params.id);
    if (!userDataById) {
      res.status(404).json({ message: 'No user data found with that id!' });
      return;
    }
    res.status(200).json(userDataById);

  } catch (err) {
    res.status(500).json(err);
  }
});


// creates users data
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User_data.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//logs out and destroys current session
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// TODO: add login put here

router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User_data.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//updates user data
router.put('/:id', async (req, res) => {
  try {
    const existingUserData = await getUserData(req.params.id);
    if (!existingUserData[0]) {
      res.status(404).json({ message: 'No user data found with that id!' });
      return;
    }
    await updateUserData(req.body, req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//deletes users data
router.delete('/:id', async (req, res) => {
  try {
    const delUserData = await getUserData(req.params.id);
    if (!delUserData) {
      res.status(404).json({ message: 'No user data found with this id!' });
      return;
    }
    await deleteUserData(req.params.id);
    res.status(204).send();

  } catch (err) {
    res.status(500).json(err);
  }
});

//exports
module.exports = router;