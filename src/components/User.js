import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/blogs/${id}`)
  }

  return (
    <div className="bg-neutral p-8 rounded-md flex flex-wrap">
      <h2 className="text-secondary text-xl w-full text-center">Added blogs</h2>
      {user.blogs.map((blog) => {
        return (
          <div className="card w-1/3 bg-base-100 shadow-xl m-4" key={blog.id}>
            <div
              className="card-body"
              role="button"
              onClick={() => handleClick(blog.id)}
            >
              <h2 className="card-title">{blog.title}!</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default User
