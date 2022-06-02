const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
  const result = await blog.save()
  res.json(result)

  } 
  catch(exception) {
  res.status(400).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = req.body
  const updatedBLog = await Blog.findByIdAndUpdate(id, blog, {
     new: true
     })
  res.json(updatedBLog)
})

module.exports = blogsRouter