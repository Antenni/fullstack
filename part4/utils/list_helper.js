const lodash = require('lodash')
const dummy = (blogs) => {
    return 1
  }
  const totalLikes = (blogs) => {
    return (
      blogs.map(blog => blog.likes)
      .reduce((total, likes) => total + likes, 0)
    )
  }

  const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }

    })
        delete favorite._id
        delete favorite._v
        return favorite
    }

    const mostBlogs = (blogs) => {
      const groupedAuthor = lodash.groupBy(blogs, blog => blog.author)
      const authorlist = []
      lodash.forEach(groupedAuthor, (authorBlogs, author) => {
          authorlist.push({
              author: author,
              blogs: authorBlogs.length
          })
      })
      const sortedList = lodash.sortBy(authorlist, author => author.blogs)
      return sortedList.pop()
  }   
  const mostLikes = (blogs) => {
    const groupedByAuthor = lodash.groupBy(blogs, blog => blog.author)
    const authorList = []
    lodash.forEach(groupedByAuthor, (authorBlogs, author) => {
        authorList.push({
            author: author,
            likes: totalLikes(authorBlogs)
        })
    })

    const sortedAuthorList = lodash.sortBy(authorList, author => author.likes)
    return sortedAuthorList.pop()


} 

  module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} 