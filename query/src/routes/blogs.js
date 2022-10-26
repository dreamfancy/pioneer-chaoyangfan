const express = require('express');
const BlogRepo = require('../repos/blog-repo');

const router = express.Router();

router.get('/query/blogs', async (req, res) => {
  const blogs = await BlogRepo.find();
  res.send(blogs);
});

router.get('/query/blog/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await BlogRepo.findById(id);
  if (blog) {
    console.log(blog);
    res.send(blog);
  } else {
    res.sendStatus(404);
  }
});

router.post('/query/blog', async (req, res) => {
  //console.log(req.body);
  const { username, title, description, contents } = req.body;
  const blog = await BlogRepo.insert(username, title, description, contents);
  res.send(blog);
});

router.put('/query/blog/:id', async (req, res) => {
  const { id } = req.params;
  const { username, title, description, contents } = req.body;
  const blog = await BlogRepo.update(
    id,
    username,
    title,
    description,
    contents
  );
  if (blog) {
    res.send(blog);
  } else {
    res.sendStatus(404);
  }
});

router.delete('query/blog/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await UserRepo.delete(id);
  if (blog) {
    res.send(blog);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
