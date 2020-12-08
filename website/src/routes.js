import React from 'react'
import { Switch } from 'react-router-dom'
import Dashboard from './containers/dashboard'
import Login from './containers/login'
import Logout from './containers/logout'
import NotFound from './containers/not_found'
import AuthenticatedRoute from './components/authenticated_route'
import UnauthenticatedRoute from './components/unauthenticated_route'

export default function Routes () {
  return (
    <Switch>
      <AuthenticatedRoute exact path='/'>
        <Dashboard />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path='/login'>
        <Login />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path='/logout'>
        <Logout />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
      <AuthenticatedRoute>
        <NotFound />
      </AuthenticatedRoute>
    </Switch>
  )
}
