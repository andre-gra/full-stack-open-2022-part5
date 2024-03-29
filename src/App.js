import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Toggable from './components/Toggable'
// import Blog from './components/Blog'
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
import { Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import usersService from './services/users'
import BlogView from './components/BlogView'
import { createPortal } from 'react-dom'

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
  const [users, setUsers] = useState()
  const location = useLocation()

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users))
  }, [])

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

  const matchUser = useMatch('/users/:id')
  const userDetail = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blogDetail = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

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
    <>
      <label htmlFor="my-modal" className="btn">
        Login
      </label>
      {createPortal(
        <>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex justify-evenly">
                  username
                  <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id="username"
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                </div>
                <div className="flex justify-evenly">
                  password
                  <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    id="password"
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                </div>
                <button
                  type="submit"
                  id="login-button"
                  className="btn btn-outline btn-secondary"
                >
                  login
                </button>
              </form>
              <label htmlFor="my-modal" className="btn btn-xs w-full mt-4">
                Chiudi
              </label>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )

  const padding = {
    padding: 5
  }

  return (
    <>
      <div className="navbar bg-neutral justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content bg-primary text-primary-content mt-3 p-2 shadow rounded-box w-52"
            >
              <li>
                <Link
                  className="btn btn-ghost normal-case text-xl"
                  style={padding}
                  to="/"
                >
                  blogs
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-ghost normal-case text-xl"
                  style={padding}
                  to="/users"
                >
                  users
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {user === null ? (
          loginForm()
        ) : (
          <p className="justify-end w-full p-4">
            <span>{user.name} logged-in</span>
            <button
              className="btn btn-primary mx-4"
              onClick={handleLogout}
              id="logout-button"
            >
              logout
            </button>
          </p>
        )}
      </div>
      <div className="container mx-auto p-8">
        <h2>
          {location.pathname === '/'
            ? 'HOME'
            : location.pathname.split('/')[1].toUpperCase()}
        </h2>
        <div className="divider"></div>
        <Notification message={notifications} />
        <ErrorNotification error={errorNotifications} />

        <Routes>
          <Route
            path="/users"
            element={users ? <Users users={users} /> : null}
          />
          <Route
            path="users/:id"
            element={userDetail ? <User user={userDetail} /> : null}
          ></Route>
          <Route
            path="blogs/:id"
            element={
              blogDetail ? (
                <BlogView
                  blog={blogDetail}
                  addLike={() => addLikeFunc(blogDetail)}
                  deleteBlog={() => deleteBlogFunc(blogDetail)}
                />
              ) : null
            }
          ></Route>
        </Routes>
        <div className="divider"></div>
        {user === null ? null : (
          <div className="bg-neutral rounded-md p-8">
            <Toggable buttonLabel="new Blog" className="btn btn-secondary">
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
            {/* <div className="blogs-container">
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
            </div> */}
          </div>
        )}
      </div>
    </>
  )
}

export default App
