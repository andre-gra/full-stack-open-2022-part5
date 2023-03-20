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
    <div className="bg-secondary rounded-md p-8 text-secondary-content">
      <div className="bg-neutral text-neutral-content p-8">
        <h1 className="text-xl text-center">{blog.title}</h1>
        <span className="block">{blog.url}</span>
        <span className="block">
          {blog.likes} likes
          <button
            onClick={addLike}
            data-testid="like-button"
            id="like-button"
            className="btn btn-secondary btn-xs mx-2"
          >
            like
          </button>
        </span>
        <span className="text-xs">added by {blog.author}</span>
      </div>
      <div className="py-4">
        <h2 className="text-lg">Comments</h2>
        <form onSubmit={submitComment}>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="write a comment here"
            id="comment"
            className="input input-bordered input-info w-full max-w-xs text-secondary"
          />
          <button type="submit" className="btn mx-4">
            add comment
          </button>
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
          <button
            onClick={deleteBlog}
            id="delete-button"
            className="btn btn-error border-warning text-error-content"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default BlogView
