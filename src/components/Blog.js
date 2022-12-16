import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike }) => {
  const [hide, setHide] = useState(true)
  const show = { display: hide ? 'none' : '' }

  const buttonVisibilityText = hide ? 'view' : 'hide'

  const toggleVisibility = () => {
    setHide(!hide)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
      } catch(error) {
        console.log(error)
      }
    }
  }

  const loggedBlogappUser = ''
  blog.loggedBlogappUser !== undefined ? blog.loggedBlogappUser.username : JSON.parse(localStorage.getItem('loggedBlogappUser'))

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonVisibilityText}</button>
      <div style={show} data-testid='toggableContent'>
        <div>{blog.url}</div>
        <div id="like-container">likes: {blog.likes} <button onClick={addLike} data-testid="like-button" id="like-button">like</button></div>
        <div>{blog.user.username}</div>
        {(loggedBlogappUser.username === blog.user.username) &&
        <button onClick={deleteBlog}>Remove</button>
        }
      </div>
    </div>
  )
}

export default Blog