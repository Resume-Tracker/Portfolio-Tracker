import React from 'react'
import { Switch } from 'react-router-dom'
import Dashboard from './containers/dashboard'
import Login from './containers/login'
import Logout from './containers/logout'
import NotFound from './containers/not_found'
import AuthenticatedRoute from './components/authenticated_route'
import UnauthenticatedRoute from './components/unauthenticated_route'

/*
  Component that acts as a router for our webapp. In charge of redirecting the user upon sucuessful authentication or whenever a session expires.
  Current pages:
  Dashboard - Home page that displays our desired graphs and data
  Login - Page where the user logins and authenticates the session to access the dashboard
  Logout - Page that ends the session and redirects the user back to the login page. User shouldn't be able to see this page since its set to redirect back to the login page when accessed.
  NotFound - 404 Page. Displayed when user tries to access a path that doesn't exist.
*/
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
