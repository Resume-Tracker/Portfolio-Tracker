import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAppContext } from '../libs/context_lib'

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
