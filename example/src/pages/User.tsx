import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../../src'
import api from '../api'
import { IGetUser } from '../api/users'

const User = () => {
  const params = useParams<{ id: string }>()

  const user = useRequest<IGetUser.Request, IGetUser.Response>(api.users.get, {
    errorLabel: 'users (get)',
  })

  const loadData = React.useCallback(async () => {
    if (!params.id) {
      return null
    }

    await user.request({ params: { id: params.id } })
  }, [user])

  React.useEffect(() => {
    loadData()
  }, [])

  if (!user.data) {
    return (
      <div>
        {user.loading && <div>...Loading</div>}

        {!user.loading && user.error && <div>{user.error.errorMessage}</div>}
      </div>
    )
  }

  const { name, avatar } = user.data

  return (
    <div>
      <div>{name}</div>

      <img src={avatar} alt={name} />
    </div>
  )
}

export default User
