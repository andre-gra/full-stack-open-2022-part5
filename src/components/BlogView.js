import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogView = ({ blog, addLike, deleteBlog }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState(blog.comments)
  const loggedBlogappUser = JSON.parse(
    localStorage.getItem('loggedBlogappUser')
  )

  const submitComment = async (event) => {
    event.preventDefault()
    const commentObj = {
      comment: comment
    }
    try {
      const response = await blogService.addComment(blog.id, commentObj)
      setCommentList(response.comments)
    } catch (error) {
      console.log(error)
    }
    setComment('')
  }

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
      <h2>Comments</h2>
      <form onSubmit={submitComment}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="write a comment here"
          id="comment"
        />
        <button type="submit">add comment</button>
      </form>
      {commentList.length > 0 && (
        <>
          <ul>
            {commentList.map((comment, index) => {
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
