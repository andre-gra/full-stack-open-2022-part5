import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Toggable from './components/Toggable'
import Blog from './components/Blog'
import { setMessage, resetMessage } from './reducers/notificationReducer'
import {
  setErrorMessage,
  resetErrorMessage
} from './reducers/errorNotificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import blogsService from './services/blogs'
import {
  setBlogs,
  createBlog,
  addLike,
  deleteBlog
} from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)
  const errorNotifications = useSelector((state) => state.errorNotifications)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogsService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setMessage(`${username} logged succesfully`)),
        setTimeout(() => {
          dispatch(resetMessage())
        }, 5000)
      dispatch(login(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(resetErrorMessage())
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const newBlog = await blogService.create(newObject)
      dispatch(createBlog(newBlog))
      dispatch(setMessage(`a new blog ${title} by ${author} added`))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 5000)
    } catch (error) {
      console.log(error)
      dispatch(setErrorMessage('Something went wrong. Retry!'))
      setTimeout(() => {
        dispatch(resetErrorMessage())
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    // blogsService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }

  const deleteBlogFunc = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
      } catch (error) {
        console.log(error)
      }
      dispatch(deleteBlog(blog.id))
    }
  }

  const addLikeFunc = async (blog) => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogService.update(newObject)
    } catch (error) {
      console.log(error)
    }
    dispatch(addLike(blog.id))
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
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )

  return (
    <Router>
      <div>
        <h2>blogs</h2>

        <Notification message={notifications} />
        <ErrorNotification error={errorNotifications} />

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>
              <span>{user.name} logged-in</span>
              <button onClick={handleLogout} id="logout-button">
                logout
              </button>
            </p>
            <Toggable buttonLabel="new Blog">
              <BlogForm
                handleSubmit={handleSubmit}
                author={author}
                title={title}
                url={url}
                setAuthor={setAuthor}
                setTitle={setTitle}
                setUrl={setUrl}
              />
            </Toggable>
            <div className="blogs-container">
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={() => addLikeFunc(blog)}
                    deleteBlog={() => deleteBlogFunc(blog)}
                  />
                ))}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
