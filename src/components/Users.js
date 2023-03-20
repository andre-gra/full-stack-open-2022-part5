import { useNavigate } from 'react-router-dom'

const Users = ({ users }) => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`${id}`)
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
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
    </div>
  )
}

export default Users
