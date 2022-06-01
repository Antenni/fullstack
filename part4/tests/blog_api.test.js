const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog One',
    author: 'Teppo Testaaja',
    url: 'http://blog.one',
    likes: 6
  },
  {
    title: 'Blog Too',
    author: 'Unhappy Tester',
    url: 'http://blog.too',
    likes: 78
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()
    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()
  }, 9999)

describe('blog api', () => {

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of blogs', async () => {
    const response = await api.get('/api/blogs')
})
})

test('unique identifier defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

})

afterAll(() => {
    mongoose.connection.close()
})