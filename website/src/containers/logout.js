import React, { useEffect } from 'react'
import { useAppContext } from '../libs/context_lib'

const fetch = require('node-fetch')

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
