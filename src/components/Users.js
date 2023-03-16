import { useNavigate } from 'react-router-dom'

const Users = ({ users }) => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`${id}`)
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <th
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    role="button"
                    onClick={() => handleClick(user.id)}
                  >
                    {user.name}
                  </th>
                  <th>{user.blogs.length}</th>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Users
