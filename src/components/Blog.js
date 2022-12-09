import { useState } from "react"

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonVisibilityText}</button> 
        <div style={show}>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button>like</button></div>
          <div>{blog.user.username}</div>
        </div>
    </div>
  )
}

export default Blog