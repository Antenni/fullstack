const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers);

//  const passwordHash = await bcrypt.hash('sekret', 10)
//  const user = new User({ username: 'root', passwordHash })

//    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daffyduck',
      name: 'Fethry Duck',
      password: 'duckduck',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

//    const usernames = usersAtEnd.map(u => u.username)
//   expect(usernames).toContain(newUser.username)
  })
})

  test('username is missing', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      name: 'Fethry Duck',
      password: 'duckduck'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username is missing')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password is missing', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'daffyduck',
      name: 'Fethry Duck',
      }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain('password is empty')
      
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

  test('username is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'du',
      name: 'Fethry Duck',
      password: 'duckduck'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain('username is too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

  test('password is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'duffyduck',
      name: 'Fethry Duck',
      password: 'du'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain('password is too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength((usersAtStart.length))
  })

afterAll(() => {
  mongoose.connection.close()
}) 