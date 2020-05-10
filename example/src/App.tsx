import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setBaseUrl } from '../../src'
import Users from './pages/Users'
import User from './pages/User'
import CreateUser from './pages/CreateUser'

const baseUrl = 'https://5eb2deca974fee0016ecd021.mockapi.io'

const App = () => {
  React.useMemo(() => setBaseUrl(baseUrl), [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/user/:id" component={User} />
        <Route path="/create-user" component={CreateUser} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
