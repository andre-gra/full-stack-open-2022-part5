/* eslint-disable no-unused-vars */
import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [hide, setHide] = useState(true)
  const show = { display: hide ? 'none' : '' }

  const buttonVisibilityText = hide ? 'view' : 'hide'

  // const toggleVisibility = () => {
  //   setHide(!hide)
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const loggedBlogappUser = JSON.parse(
    localStorage.getItem('loggedBlogappUser')
  )

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      {/* <button>{buttonVisibilityText}</button> */}
      <div style={show} data-testid="toggableContent">
        <div>{blog.url}</div>
        <div id="like-container">
          likes: {blog.likes}{' '}
          <button onClick={addLike} data-testid="like-button" id="like-button">
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {loggedBlogappUser.username === blog.user.username && (
          <button onClick={deleteBlog} id="delete-button">
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
