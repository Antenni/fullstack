const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
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