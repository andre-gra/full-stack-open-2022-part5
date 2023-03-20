const BlogForm = ({
  handleSubmit,
  setTitle,
  setAuthor,
  setUrl,
  author,
  title,
  url
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="w-full">Create new</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
            id="title"
            className="input input-bordered input-secondary w-full max-w-xs mx-2"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Password"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
            id="author"
            className="input input-bordered input-secondary w-full max-w-xs mx-2"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="text"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
            id="url"
            className="input input-bordered input-secondary w-full max-w-xs mx-2"
          />
        </div>
        <button
          type="submit"
          data-testid="create-button"
          className="btn btn-secondary btn-sm w-20"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
