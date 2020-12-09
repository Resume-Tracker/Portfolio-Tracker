import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAppContext } from '../libs/context_lib'

/*
  React component that checks if the user is authenticated and able to view their requested page.
  Logout page is automatically redirected back to the login page.
*/
export default function AuthenticatedRoute ({ children, ...rest }) {
  const { pathname, search } = useLocation()
  const { isAuthenticated } = useAppContext()

  // no redirect back to /logout to prevent loops
  function getRedirectURL () {
    if (pathname === '/logout') {
      return '/login'
    } else {
      return `/login?redirect=${pathname}${search}`
    }
  }

  return (
    <Route {...rest}>
      {isAuthenticated
        ? (
            // children is the child components of AuthenticatedRoute component
            children
          )
        : (
          <Redirect to={getRedirectURL()} />
          )}
    </Route>
  )
}
