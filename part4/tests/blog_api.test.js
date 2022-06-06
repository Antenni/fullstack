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
  
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
}
  })

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

test('add a blog', async () => {
  const newBlog = {
    title: 'Blogiest Blog',
    author: "Jenny From The Blog",
    url: "http://jftb.com",
    likes: 21,
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  const authors = blogs.map(aut => aut.author)
  expect(blogs).toHaveLength(initialBlogs.length + 1)
  expect(authors).toContain(newBlog.author)

})

test('blog with no likes', async () => {
  const newBlog = {
    title: 'Blog with no likes',
    author: 'No Like',
    url: 'http://like.no'
  }

  const noLikes = await api.post('/api/blogs').send(newBlog)

  expect(noLikes.body).toHaveProperty('likes', 0)
})

test("no title and url", async () => {
  const noTitleUrl = {
    author: 'No Titleurl',
    likes: 5
  }

  await api
    .post("/api/blogs")
    .send(noTitleUrl)
    .expect(400)
})

test('delete blog', async () => {
  const blogs = await Blog.find({})
  const deleteBlog = blogs[0]

  await api
    .delete(`/api/blogs/${deleteBlog.id}`)
    .expect(204)

    const deletedBlog = await Blog.find({})
    expect(deletedBlog).toHaveLength(initialBlogs.length - 1)
  })

  test('update and add likes', async () => {
    const blogs = await api.get("/api/blogs")
    const id = blogs.body[1].id
    const updateLikes = { likes: 333 }

    const updatedBlog = await api.put(`/api/blogs/${id}`).send(updateLikes)

    expect(updatedBlog.body).toHaveProperty('likes', updateLikes.likes)
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('add user with uniques username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'royr',
        name: 'Roy Rodgers',
        password: 'sregdor',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

afterAll(() => {
    mongoose.connection.close()
})