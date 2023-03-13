const User = ({ user }) => {
  return (
    <>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </>
  )
}

export default User
