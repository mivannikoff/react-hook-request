import * as React from 'react'
import { Link, generatePath } from 'react-router-dom'
import { useRequest } from '../../../../src'
import PageWrapper from '../wrappers/PageWrapper'
import api from '../../api'
import { IGetUsers } from '../../api/users'
import { ROUTES } from '../../constants/routes'

const Users: React.FC = () => {
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
      <PageWrapper>
        {users.loading && <div>...Loading</div>}

        {!users.loading && users.error && <div>{users.error.errorMessage}</div>}
      </PageWrapper>
    )
  }

  const renderUsers = () => {
    const userList = users.data || []

    return userList.map(({ id, name, avatar }: IGetUsers.User) => (
      <Link key={id} to={generatePath(ROUTES.USER_PAGE, { id })}>
        <div>{name}</div>

        <img src={avatar} alt={name} />
      </Link>
    ))
  }

  return (
    <PageWrapper>
      <h1>User List</h1>

      <div>{renderUsers()}</div>
    </PageWrapper>
  )
}

export default Users
