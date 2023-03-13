import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/blogs/${id}`)
  }

  return (
    <>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              key={blog.id}
              role="button"
              onClick={() => handleClick(blog.id)}
            >
              {blog.title}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default User
