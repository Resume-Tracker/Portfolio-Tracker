import React, { useEffect } from 'react'
import { useAppContext } from '../libs/context_lib'

const fetch = require('node-fetch')

/*
  React component that makes a request to the backend to logout through the /logout endpoint.
  This component will end the user's session and log them out from the dashboard.
  Upon completion of request, routes.js will redirect the user to back to the login page.
*/
export default function Logout () {
  const { userHasAuthenticated } = useAppContext()

  useEffect(() => {
    async function onLogout () {
      await fetch('/logout')
        .then(response => {
          userHasAuthenticated(false)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
    onLogout()
  }, [userHasAuthenticated])

  return (
    <div className='text-center'>
      <h3>Logged out</h3>
    </div>
  )
}
