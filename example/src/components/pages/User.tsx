import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../../../src'
import PageWrapper from '../wrappers/PageWrapper'
import api from '../../api'
import { IGetUser } from '../../api/users'

const User: React.FC = () => {
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
      <PageWrapper>
        {user.loading && <div>...Loading</div>}

        {!user.loading && user.error && <div>{user.error.errorMessage}</div>}
      </PageWrapper>
    )
  }

  const { name, avatar } = user.data

  return (
    <PageWrapper>
      <div>{name}</div>

      <img src={avatar} alt={name} />
    </PageWrapper>
  )
}

export default User
