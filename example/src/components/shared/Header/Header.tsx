import * as React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

const Header: React.FC = () => (
  <div>
    <Link to={ROUTES.USERS_PAGE} style={{ padding: '3px 10px' }}>Users</Link>
    <Link to={ROUTES.CREATE_USER_PAGE}>Create user</Link>
  </div>
)

export default Header
