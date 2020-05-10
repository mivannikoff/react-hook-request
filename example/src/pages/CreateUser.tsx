import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRequest } from '../../../src'
import api from '../api'
import { ICreateUser } from '../api/users'

const CreateUser = () => {
  const { handleSubmit, register, errors, reset } = useForm()

  const createUser = useRequest<ICreateUser.Request, ICreateUser.Response>(
    api.users.create,
    {
      errorLabel: 'users (create)',
    }
  )

  const handleAddUser = React.useCallback(
    async (values: ICreateUser.Request) => {
      const handleSuccess = (data: ICreateUser.Response) => {
        reset()

        alert(`User created - ${data.id}`)
      }

      await createUser.request({
        params: values,
        callbacks: { successCallback: handleSuccess },
      })
    },
    [createUser, reset]
  )

  return (
    <div>
      <div>Create User</div>

      <form
        onSubmit={handleSubmit(handleAddUser)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          name="name"
          placeholder="Name"
          ref={register({ required: true })}
        />
        {errors.name && <span>Require field!</span>}

        <input
          name="avatar"
          placeholder="Link to avatar"
          ref={register({ required: true })}
        />
        {errors.avatar && <span>Require field!</span>}

        <button type="submit" disabled={createUser.loading}>
          {createUser.loading ? '...Loading' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default CreateUser
