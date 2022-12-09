import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [hide, setHide] = useState(true)
  const [blogIstance, setblogIstance] = useState(blog)

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

  const addLike = async () => {
    const newObject = {
      ...blogIstance,
      likes: blogIstance.likes + 1
    }
    try {
      await blogService.update(newObject)
    } catch (error) {
      console.log(error);
    }
    setblogIstance(newObject)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blogIstance.title} by ${blogIstance.author}`)) {
      try {
        await blogService.deleteBlog(blogIstance.id)
      } catch(error) {
        console.log(error)
      }
    }
  }

  const loggedBlogappUser = JSON.parse(localStorage.getItem('loggedBlogappUser'))

  return (
    <div style={blogStyle}>
      {blogIstance.title} {blogIstance.author}
      <button onClick={toggleVisibility}>{buttonVisibilityText}</button>
      <div style={show}>
        <div>{blogIstance.url}</div>
        <div>likes: {blogIstance.likes} <button onClick={addLike}>like</button></div>
        <div>{blogIstance.user.username}</div>
        {(loggedBlogappUser.username === blogIstance.user.username) && <button onClick={deleteBlog}>Remove</button>}
      </div>
    </div>
  )
}

export default Blog