const router = require('express').Router();
const { getUsersData, getUserData, createUserData, updateUserData, deleteUserData } = require("../../repository/userDataRepository")


router.get('/', async (req, res) => {
  try {
    const UserData = await getUsersData();
    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

router.post('/', async (req, res) => {
  try {
    await createUserData(req.body);
    res.status(201).send();
  } catch(err) {
    res.status(500).json(err);
  }

});


router.put('/:id', async (req, res) => {
  try {
    const existingUserData = await getUserData(req.params.id);
    if (!existingUserData) {
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

router.delete('/:id', async (req, res) => {
  try {
    const delUserData = await getUserData(req.params.id);
    if (!delUserData) {
      res.status(404).json({ message: 'User data found with this id!' });
      return;
    }
    await deleteUserData(req.params.id);
    res.status(204).send();

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;