const BlogForm = ({ handleSubmit, setTitle, setAuthor, setUrl, author, title, url }) => {
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Password"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="text"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write url here'
          />
        </div>
        <button type="submit" data-testid="create-button">create</button>
      </form>
    </>
  )
}

export default BlogForm