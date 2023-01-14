const router = require('express').Router();
const { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost  } = require("../../repository/blogPostsRepository")

//gets all Blog posts
router.get('/', async (req, res) => {
  try {
    const blogPostsData = await getBlogPosts();
    res.status(200).json(blogPostsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//gets single blog post
router.get('/:id', async (req, res) => {
  try {
    const blogPostById = await getBlogPost(req.params.id);
    if (!blogPostById) {
      res.status(404).json({ message: 'No blog post found with that id!' });
      return;
    }
    res.status(200).json(blogPostById);

  } catch (err) {
    res.status(500).json(err);
  }
});

//creates a blog post
router.post('/', async (req, res) => {
  try {
    await createBlogPost(req.body);
    res.status(201).send();
  } catch(err) {
    res.status(500).json(err);
  }

});

//updates a blog post
router.put('/:id', async (req, res) => {
  try {
    const existingBlogPost = await getBlogPost(req.params.id);
    if (!existingBlogPost) {
      res.status(404).json({ message: 'No blog post found with that id!' });
      return;
    }
    await updateBlogPost(req.body, req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//deletes a blog post
router.delete('/:id', async (req, res) => {
  try {
    const delBlogPost = await getBlogPost(req.params.id);
    if (!delBlogPost) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }
    await deleteBlogPost(req.params.id);
    res.status(204).send();

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;