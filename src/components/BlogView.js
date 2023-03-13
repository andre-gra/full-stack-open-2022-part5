import React from 'react'

const BlogView = ({ blog, addLike }) => {
  return (
    <>
      <h1>{blog.title}</h1>
      <div>
        {console.log(blog)}
        <span style={{ display: 'block' }}>{blog.url}</span>
        <span style={{ display: 'block' }}>
          {blog.likes} likes
          <button onClick={addLike} data-testid="like-button" id="like-button">
            like
          </button>
        </span>
        <span style={{ display: 'block' }}>added by {blog.author}</span>
      </div>
    </>
  )
}

export default BlogView
