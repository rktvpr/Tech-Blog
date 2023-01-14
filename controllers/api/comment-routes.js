const router = require('express').Router();
const { getComments, getComment, createComment, updateComment, deleteComment } = require("../../repository/commentRepository")
const withAuth = require("../../utils/auth");

router.get('/', async (req, res) => {
    try {
        const commentData = await getComments();
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const commentDataById = await getComment(req.params.id);
        if (!commentDataById) {
            res.status(404).json ({ message: 'No comment found with that Id!'});
            return;
        }
        res.status(200).json(commentDataById);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        await createComment(req.body);
        res.status(201).send();
    } catch(err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const existingComment = await getComment(req.params.id);
        if (!existingComment) {
            res.status(404).json({ message: 'No Comment found with that id!'});
            return;
        }
        await updateComment(req.body, req.params.id);
        res.status(204).send();
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const delComment = await getComment(req.params.id);
        if (!delComment) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }
        await deleteComment(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;