import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Toggable from './components/Toggable'
import Blog from './components/Blog'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setMessage(
        `${username} logged succesfully`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      await blogService.create(newObject)
      setMessage(
        `a new blog ${title} by ${author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage('Something went wrong. Retry!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addLike = async (blog) => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogService.update(newObject)
    } catch (error) {
      console.log(error)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />
      <ErrorNotification error={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p><span>{user.name} logged-in</span><button onClick={handleLogout}>logout</button></p>
          <Toggable buttonLabel = 'new Blog'>
            <BlogForm
              handleSubmit={handleSubmit}
              author={author}
              title={title}
              url={url}
              setAuthor={setAuthor}
              setTitle={setTitle}
              setUrl={setUrl}
              blogs={blogs}
            />
          </Toggable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} />
          )}
        </div>
      }

    </div>
  )
}

export default App
