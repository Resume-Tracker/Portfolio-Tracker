import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppContext } from '../libs/context_lib'

// extract the redirect URL from the query string e.g. '?redirect=/test'
function querystring (name, url = window.location.href) {
  // replace [] with \[]
  name = name.replace(/[[]]/g, '\\$&')

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i')
  const results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default function UnauthenticatedRoute ({ children, ...rest }) {
  const { isAuthenticated } = useAppContext()
  const redirect = querystring('redirect')
  return (
    <Route {...rest}>
      {!isAuthenticated
        ? (
            // children is the child components of UnauthenticatedRoute component
            children
          )
        : (
          <Redirect to={redirect === '' || redirect === null ? '/' : redirect} />
          )}
    </Route>
  )
}
