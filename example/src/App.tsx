import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { setBaseUrl } from '../../src'
import { ROUTES } from './constants/routes'

import Users from './components/pages/Users'
import User from './components/pages/User'
import CreateUser from './components/pages/CreateUser'

const baseUrl = 'https://5eb2deca974fee0016ecd021.mockapi.io'

const App: React.FC = () => {
  React.useMemo(() => setBaseUrl(baseUrl), [])

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ROUTES.ROOT_PAGE}
          render={() => <Redirect to={ROUTES.USERS_PAGE} />}
        />
        <Route path={ROUTES.USERS_PAGE} component={Users} />
        <Route path={ROUTES.USER_PAGE} component={User} />
        <Route path={ROUTES.CREATE_USER_PAGE} component={CreateUser} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
