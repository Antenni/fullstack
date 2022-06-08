const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'missing or invalid token' })
  }
  const userid = decodedToken.id

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
  } else {
      response.status(400).json({ error: 'token or user does not exist' })
  }
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