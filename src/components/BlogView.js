import React from 'react'

const BlogView = ({ blog, addLike, deleteBlog }) => {
  const loggedBlogappUser = JSON.parse(
    localStorage.getItem('loggedBlogappUser')
  )

  return (
    <>
      <h1>{blog.title}</h1>
      <div>
        <span style={{ display: 'block' }}>{blog.url}</span>
        <span style={{ display: 'block' }}>
          {blog.likes} likes
          <button onClick={addLike} data-testid="like-button" id="like-button">
            like
          </button>
        </span>
        <span style={{ display: 'block' }}>added by {blog.author}</span>
      </div>
      {blog.comments.length > 0 && (
        <>
          <h2>Comments</h2>
          <ul>
            {blog.comments.map((comment, index) => {
              return <li key={index}>{comment}</li>
            })}
          </ul>
        </>
      )}
      {loggedBlogappUser.username === blog.user.username && (
        <button onClick={deleteBlog} id="delete-button">
          Remove
        </button>
      )}
    </>
  )
}

export default BlogView
