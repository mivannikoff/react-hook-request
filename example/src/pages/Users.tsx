import * as React from 'react'
import { useRequest } from '../../../src'
import api from '../api'
import { IGetUsers } from '../api/users'

const Users = () => {
  const users = useRequest<IGetUsers.Request, IGetUsers.Response>(
    api.users.getAll,
    {
      errorLabel: 'users (getAll)',
    }
  )

  const loadData = React.useCallback(async () => {
    await users.request({ params: {} })
  }, [users])

  React.useEffect(() => {
    loadData()
  }, [])

  if (!users.data) {
    return (
      <div>
        {users.loading && <div>...Loading</div>}

        {!users.loading && users.error && <div>{users.error.errorMessage}</div>}
      </div>
    )
  }

  const renderUsers = () => {
    const userList = users.data || []

    return userList.map(({ id, name, avatar }: IGetUsers.User) => (
      <div key={id}>
        <div>{name}</div>

        <img src={avatar} alt={name} />
      </div>
    ))
  }

  return (
    <div>
      <h1>User List</h1>

      <div>{renderUsers()}</div>
    </div>
  )
}

export default Users
