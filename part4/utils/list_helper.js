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

  module.exports = {
    dummy, totalLikes, favoriteBlog
  } 