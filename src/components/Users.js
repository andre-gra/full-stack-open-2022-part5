import usersService from '../services/users'
import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users))
  }, [])

  return (
    <>
      <h2>Users</h2>
      <p>
        <table>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <>
                <tr>
                  <th>{user.name}</th>
                  <th>{user.blogs.length}</th>
                </tr>
              </>
            )
          })}
        </table>
      </p>

      {console.log(users)}
    </>
  )
}

export default Users
